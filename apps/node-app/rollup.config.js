import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
	input: "src/index.ts",
	output: {
		dir: "../../dist/apps/services/assistant-volunteer/app",
		format: "esm",
	},
	plugins: [
		typescript({
			tsconfig: "./tsconfig.build.json",
			sourceMap: true,
			outDir: "../../dist/apps/services/assistant-volunteer/app",
		}),
		nodeResolve({
			browser: false,
			resolveOnly: [/^@packages/],
			mainFields: ["module", "main"],
			rootDir: "../../",
		}),
	],
};
