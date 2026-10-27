import { Plugin } from "@opencode/plugin"

export default Plugin.define({
	id: "fdhPlugin",
	async setup(ctx) {
		console.log(`loaded in OpenCode ${ctx.app.version}`)
		await ctx.tool.hook("execute.before", (event) => {
			console.log(event.sessionID)  // agent loop, incl. tool-driven continuations
			// const input = event.input as { filePath?: string }
			// if (event.tool === "read" && input.filePath?.includes(".env")) {
			// 	throw new Error("Do not read .env files")
			// }
		})
		return () => console.log("unloaded")
	},
})
				// "tool.execute.before": async( input, output ) => {
				// 	try {
				// 		const inputStr = await readStdin();
				// 		const inputJson = JSON.parse(inputStr);
				// 	} catch (error) {
				// 		// Fallback catch block to guarantee the guard fails OPEN on unexpected errors
				// 		throw new Error("Unable to guard client bundary.", {cause: error});
				// 	}
				//
				// }

/*
#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Determine harness directory relative to this script's location
const scriptDir = __dirname;
const HARNESS_DIR = path.resolve(scriptDir, '../..');

if (!HARNESS_DIR) {
    process.exit(0);
}

// Function to read all content from standard input (replacing standard bash 'cat')
async function readStdin(): Promise<string> {
    const lines: string[] = [];
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    for await (const line of rl) {
        lines.push(line);
    }
    return lines.join('\n');
}

async function main() {
    try {
        const inputStr = await readStdin();
        let inputJson: any;

        // Replaces the dependency on the 'jq' binary by using native JSON parsing
        try {
            inputJson = JSON.parse(inputStr);
        } catch (e) {
            // Fails open if JSON is malformed
            process.exit(0);
        }

        const sessionId: string = inputJson?.session_id || "";
        const toolInput = inputJson?.tool_input || {};
        const filePath: string = toolInput.file_path || toolInput.notebook_path || "";

        // Nothing path-shaped to check
        if (!filePath || !sessionId) {
            process.exit(0);
        }

        const lockFile = path.join(HARNESS_DIR, '.claude', 'sessions', `${sessionId}.client`);
        if (!fs.existsSync(lockFile)) {
            process.exit(0);
        }

        // Read lock file and strip all whitespace
        const lockContent = fs.readFileSync(lockFile, 'utf8').replace(/\s+/g, '');
        if (!lockContent) {
            process.exit(0);
        }

        // Emulate Bash's ${LOCK%%/*} (extract up to the first slash)
        const activeClient = lockContent.split('/')[0];
        if (!activeClient) {
            process.exit(0);
        }

        // Resolve absolute path and collapse "." and ".." segments textually.
        // path.resolve accurately processes paths even for files that do not exist yet.
        const cleanPath = path.isAbsolute(filePath)
            ? path.resolve(filePath)
            : path.resolve(HARNESS_DIR, filePath);

        const clientsRoot = path.resolve(HARNESS_DIR, 'clients');

        // Only paths inside this harness's clients/ tree are in scope
        if (!cleanPath.startsWith(clientsRoot + path.sep) && cleanPath !== clientsRoot) {
            process.exit(0);
        }

        // Isolate the client subdirectory string
        const relativeToRoot = path.relative(clientsRoot, cleanPath);
        if (!relativeToRoot || relativeToRoot === '.' || relativeToRoot.startsWith('..')) {
            process.exit(0);
        }

        const targetClient = relativeToRoot.split(path.sep)[0];

        // Writes directly into clients/ itself, or into shared registry files, are fine
        if (!targetClient || targetClient === relativeToRoot) {
            process.exit(0);
        }

        // Enforce the boundary logic
        if (targetClient !== activeClient) {
            console.error(`BLOCKED: client workspace boundary.\n`);
            console.error(`  active client : ${activeClient}`);
            console.error(`  write target  : clients/${targetClient}/...\n`);
            console.error(`This session is locked to '${activeClient}'. Client data never crosses workspace`);
            console.error(`boundaries. To work on '${targetClient}', run: /use-client ${targetClient}`);

            // Exit 2 blocks the operation in the Claude Code harness
            process.exit(2);
        }

        process.exit(0);
    } catch (error) {
        // Fallback catch block to guarantee the guard fails OPEN on unexpected errors
        process.exit(0);
    }
}

main();

 */