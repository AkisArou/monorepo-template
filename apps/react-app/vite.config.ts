import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "dist",
	},
	envDir: "../../packages/YOUR-ENV-DIR",
	plugins: [react()],
});
