import { OperationStatus } from "azure-devops-node-api/interfaces/common/OperationsInterfaces";
import type { Operation } from "azure-devops-node-api/interfaces/common/OperationsInterfaces";

/** The slice of typed-rest-client we need; keeps OperationApi off the whole client. */
interface Getter {
	get(url: string): Promise<{ result: any }>;
}

const settled = (status?: OperationStatus) =>
	status === OperationStatus.Succeeded ||
	status === OperationStatus.Failed ||
	status === OperationStatus.Cancelled;

export class OperationApi {

	constructor(private readonly rest: Getter) { }

	/**
	 * Polls until the operation settles, backing off 2s -> 10s. Returns the
	 * last state on success, failure, timeout or abort, so a pending operation
	 * is reported and never lost.
	 */
	async wait(
		url: string,
		timeoutMs: number,
		watching?: (operation: Operation) => void,
		signal?: AbortSignal,
	) {
		const deadline = Date.now() + timeoutMs;
		let pause = 2000;
		let operation = await this.fetch(url);

		while (!settled(operation.status) && Date.now() < deadline && !signal?.aborted) {
			watching?.(operation);
			await new Promise(done => setTimeout(done, pause));
			pause = Math.min(pause * 2, 10_000);
			operation = await this.fetch(url);
		}
		return operation;
	}

	/** A just-created operation answers 404 for a moment; that is pending, not an error. */
	private async fetch(url: string): Promise<Operation> {
		const response = await this.rest.get(withVersion(url));
		return (response.result as Operation) ?? { status: OperationStatus.Queued };
	}
}

function withVersion(url: string): string {
	if (url.includes("api-version=")) return url;
	return `${url}${url.includes("?") ? "&" : "?"}api-version=7.0`;
}
