import * as vm from "azure-devops-node-api";
// .js suffixes: these are CJS subpaths imported from an ESM module, so the
// extension has to be spelled out for Node's resolver to find them.
import type * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces.js";
import type * as vso from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces.js";

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
    
  private readonly requestOptions: vso.IRequestOptions | undefined;

  constructor(
      private readonly serverUrl: string,
      private readonly project: string,
      private readonly token: string,
      requestOptions?: vso.IRequestOptions,
  ) {
      this.requestOptions = requestOptions;
  }

  /**
   * Opens the connection and proves the credentials work before handing the
   * client back, so a bad token surfaces here rather than on the first
   * work-item call.
   */
  async connect(): Promise<vm.WebApi> {
      const api = new vm.WebApi(
          this.serverUrl,
          vm.getPersonalAccessTokenHandler(this.token),
          this.requestOptions,
      );
      const data: lim.ConnectionData = await api.connect();
      console.log(`Hello ${this.displayName(data)}`);
      return api;
  }

  /** Announces a section of console output. */
  banner(title: string): void {
    console.log("=======================================");
    console.log(`\t${title}`);
    console.log("=======================================");
  }

    /** Announces a sub-section of console output. */
  heading(title: string): void {
    console.log();
    console.log(`> ${title}`);
  }

  /** Azure reports an optional identity; never let that become "undefined". */
  private displayName(data: lim.ConnectionData): string {
      return data.authenticatedUser?.providerDisplayName ?? "<unknown user>";
  }

}

export default AzureDevOps;
