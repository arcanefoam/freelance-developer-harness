import * as vm from "azure-devops-node-api";
import type * as vso from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces.js";
import { WorkItemTrackingApi } from "./work-items";
import { ProjectApi } from "./projects";
import { OperationApi } from "./operation";

/**
 * One object that owns the whole Azure DevOps session: which server, which
 * project, who we authenticate as, and how progress is reported on the console.
 *
 * Elegant-Objects notes:
 * - The former module-level functions are now behavior of a single object, so
 *   callers never reach for `process.env` or for a utility namespace.
 * - All fields are immutable; state never changes after construction. Anything
 *   that needs a different server/project/token is a different `AzureDevOps`.
 *
 * Usage:
 *
 *   const devops = new AzureDevOps("https://org.visualstudio.com", "Core", "pat");                 
 *   const api = await devops.connect();
 *   devops.heading(`Project ${devops.project()}`);
 *
 *   // Behind a proxy:
 *   const devops = new AzureDevOps("https://org.visualstudio.com", "Core", "pat", {
 *     proxy: { proxyUrl: "http://127.0.0.1:8888" },
 *     ignoreSslError: true,
 *   });
 */
export class AzureDevOps {
    
  constructor(
      private readonly serverUrl: string,
      private readonly project: string,
      private readonly token: string,
      requestOptions?: vso.IRequestOptions,
  ) {
      this.requestOptions = requestOptions;
			this.api = null;
  }

  /**
   * Opens the connection and proves the credentials work before handing the
   * client back, so a bad token surfaces here rather than on the first
   * work-item call.
   */
  async connect() {
      this.api = new vm.WebApi(
          this.serverUrl,
          vm.getPersonalAccessTokenHandler(this.token),
          this.requestOptions,
      );
  }

	async workItemTracking() {
		if (this.api == null) {
			throw new Error("Call connect before requesting specific APIs");
		}
		return new WorkItemTrackingApi(await this.api.getWorkItemTrackingApi(), this.project);
	}

	async projects() {
		if (this.api == null) {
			throw new Error("Call connect before requesting specific APIs");
		}
		return new ProjectApi(await this.api.getCoreApi());
	}

	async operations() {
		if (this.api == null) {
			throw new Error("Call connect before requesting specific APIs");
		}
		return new OperationApi(this.api.rest);
	}

	private readonly requestOptions: vso.IRequestOptions | undefined;
	private api: vm.WebApi | null;

}


