import { Plugin } from "@opencode/plugin"

export default Plugin.define({
	id: "session-id",
	async setup(ctx) {
		await ctx.tool.transform((editor) => {
			editor.add({
				name: "current_session_id",
				description: "Return the ID of the current OpenCode session",
				input: {
					type: "object",
					properties: {},
					required: [],
					additionalProperties: false,
				},
				execute: async (_input, context) => {
					return { content: context.sessionID }
				},
			})
		})
	},
})