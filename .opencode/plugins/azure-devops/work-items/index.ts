import { Plugin } from "@opencode/plugin" // v2 uses @opencode/plugin
import AzureDevOps from "../common"
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
        description: "Queries the Azure DevOps for existing Work Items",
        input: {
          type: "object",
          properties: {
            project: { type: "string", description: "The Azure Project slug" }
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
            const url = requireEnv("AZURE_DEVOPS_URL")
            const bearerToken = requireEnv("AZURE_DEVOPS_PAT")

            const devops = new AzureDevOps(url, input.project, bearerToken);                 
						devops.banner("TEST")
            const api = await devops.connect();
						return { content: JSON.stringify(api.serverUrl) };
          } catch (error: any) {
            return { content: `API Request failed: ${error.message}` };
          }
        }
      })
    })
  }
})
