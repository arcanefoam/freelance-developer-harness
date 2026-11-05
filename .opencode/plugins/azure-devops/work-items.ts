import { IWorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";

export class WorkItemTrackingApi {

	constructor(
		private readonly api: IWorkItemTrackingApi,
		private readonly project: string) { }

	async all() {
		const wiqlResult = await this.api.queryByWiql(this.allWorkItemsQuery());
		if (!wiqlResult.workItems || wiqlResult.workItems.length === 0) {
			console.log("No Epics, Features, or User Stories found.");
			return [];
		}
		const ids = wiqlResult.workItems
			.map(item => item.id)
			.filter((id): id is number => id !== undefined);

		console.log(`Found ${ids.length} items. Fetching batch details...`);

		// 4. Batch fetch details in chunks of 200 (Azure DevOps endpoint constraint)
		const allDetails: any[] = [];
		const fields = [
			"System.Id",
			"System.WorkItemType",
			"System.Title",
			"System.State"
		];

		for (let i = 0; i < ids.length; i += 200) {
			const chunkIds = ids.slice(i, i + 200);

			// Azure DevOps rejects `fields` together with `$expand`, so the field
			// projection wins: nothing here consumes the relation data.
			const chunkDetails = await this.api.getWorkItems(
				chunkIds,
				fields,
				undefined, // asOf timestamp (optional)
				undefined // expand (cannot be combined with fields)
			);

			allDetails.push(...chunkDetails);
		}

		return allDetails;
	}

	// Define and run the WIQL query to pull target item IDs
	private allWorkItemsQuery() {
		return {
			query: `SELECT [System.Id] 
				FROM WorkItems 
				WHERE [System.TeamProject] = '${this.project}' 
				AND [System.WorkItemType] IN ('Epic', 'Feature', 'User Story', 'Bug')`
		};
	}
}
