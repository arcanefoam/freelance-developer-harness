import { Plugin } from "@opencode/plugin" // v2 uses @opencode/plugin
import { OperationStatus } from "azure-devops-node-api/interfaces/common/OperationsInterfaces"
import { AzureDevOps } from "../common"
import { loadEnv, requireEnv } from "../env"

// Projects normally finish well inside this; on expiry the operation is
// reported as pending so it can be followed up instead of retried.
const PROVISION_TIMEOUT_MS = 120_000

export default Plugin.define({
  id: "azure-devops-projects",
  async setup(ctx) {
    // Register the custom tool using the v2 transform syntax
    await ctx.tool.transform(editor => {
      editor.namespace({ 
        name: "Azure DevOps Projects", 
        description: "Azure Project lookups" 
      })

      editor.add({
        name: "fetchProject",
        description: "Queries Azure DevOps for a single project",
        input: {
          type: "object",
          properties: {
            project: { type: "string", description: "The Azure Project name or id" }
          },
          required: ["project"],
          additionalProperties: false
        },
        options: {
          namespace: "azure",
          codemode: true
        },
        async execute(input: any) {
          try {
            loadEnv()
            const url = requireEnv("AZURE_ORG")
            const bearerToken = requireEnv("AZURE_ORG_PAT")
            const devops = new AzureDevOps(url, input.project, bearerToken);
            await devops.connect();
            const projects = await devops.projects();
            const project = await projects.get(input.project);
            if (!project) {
              return { content: `Project '${input.project}' was not found (or is not visible to this token).` };
            }
            return { content: JSON.stringify(project, null, 2) };
          } catch (error: any) {
            return { content: `API Request failed: ${error.message}` };
          }
        }
      })

      editor.add({
        name: "createProject",
        description: "Creates a Git-backed Azure DevOps project and waits for it to provision",
        input: {
          type: "object",
          properties: {
            project: { type: "string", description: "The Azure Project name to create" },
            wait: { type: "boolean", description: "Wait for provisioning (default true); false returns the operation to poll" }
          },
          required: ["project"],
          additionalProperties: false
        },
        options: {
          namespace: "azure",
          codemode: true
        },
        async execute(input: any, context: any) {
          try {
            loadEnv()
            const url = requireEnv("AZURE_ORG")
            const bearerToken = requireEnv("AZURE_ORG_PAT")
            const devops = new AzureDevOps(url, input.project, bearerToken);
            await devops.connect();
            const projects = await devops.projects();

            // A retried create against an existing name is a hard failure, so
            // settle that before queueing anything.
            const existing = await projects.get(input.project);
            if (existing) {
              return { content: `Project '${input.project}' already exists (${existing.id}).` };
            }

            const operation = await projects.create(input.project);
            if (!operation.id || !operation.url) {
              return { content: "Azure accepted the request but returned no operation to follow." };
            }
            if (input.wait === false) {
              return { content: JSON.stringify(operation, null, 2) };
            }

            const operations = await devops.operations();
            const final = await operations.wait(
              operation.url,
              PROVISION_TIMEOUT_MS,
              (progress) => {
                void context.progress({
                  project: input.project,
                  status: OperationStatus[progress.status ?? OperationStatus.NotSet]
                });
              },
              context.signal
            );

            if (final.status === OperationStatus.Failed || final.status === OperationStatus.Cancelled) {
              const reason = final.detailedMessage ?? final.resultMessage ?? "no reason given";
              return { content: `Project '${input.project}' was not created: ${OperationStatus[final.status]} - ${reason}` };
            }

            if (final.status !== OperationStatus.Succeeded) {
              return {
                content: `Project '${input.project}' is still provisioning (${OperationStatus[final.status ?? OperationStatus.NotSet]}). Follow operation ${operation.id} to completion.`
              };
            }

            const created = await projects.get(input.project);
            return {
              content: created
                ? JSON.stringify(created, null, 2)
                : `Project '${input.project}' reports as created but is not readable yet.`
            };
          } catch (error: any) {
            return { content: `API Request failed: ${error.message}` };
          }
        }
      })
    })
  }
})
