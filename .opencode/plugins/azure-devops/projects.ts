import { ICoreApi } from "azure-devops-node-api/CoreApi";

export class ProjectApi {

	constructor(private readonly api: ICoreApi) { }

	async get(projectId: string) {
		// A 404 resolves to null instead of throwing: typed-rest-client
		// swallows NotFound and hands back a null result, so callers must
		// treat null as "absent, or not visible to this token".
		return this.api.getProject(projectId);
	}

	// Creation is queued, not immediate: the server answers with a long-running
	// operation whose id has to be polled before the project is readable.
	async create(projectId: string) {
		return this.api.queueCreateProject({
			name: projectId,
			capabilities: {
				versioncontrol: { sourceControlType: "Git" }
			}
		});
	}
}
