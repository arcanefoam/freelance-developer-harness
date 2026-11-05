import { Plugin } from "@opencode/plugin" // v2 uses @opencode/plugin
import { AzureDevOps } from "../common"
import { loadEnv, requireEnv } from "../env"

export default Plugin.define({
  id: "azure-devops-work-items",
  async setup(ctx) {
    // Register the custom tool using the v2 transform syntax
    await ctx.tool.transform(editor => {
      editor.namespace({ 
        name: "Azure DevOps Work Items", 
        description: "Azure Work Items" 
      })

      editor.add({
        name: "fetchWorkItems",
        description: "Queries the Azure DevOps for existing Work Items (Epics, Features, User Stories and Bugs)",
        input: {
          type: "object",
          properties: {
            project: { type: "string", description: "The Azure Project name" }
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
						const wit = await devops.workItemTracking();
						const items = await wit.all();
						return { content: JSON.stringify(items, null, 2) };
          } catch (error: any) {
            return { content: `API Request failed: ${error.message}` };
          }
        }
      })
    })
  }
})
