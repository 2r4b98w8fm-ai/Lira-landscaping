import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

/**
 * Artifact-hosting build: like the single-file build but with the bundled
 * font stripped (system font stack only) to keep the payload small for
 * hosted-viewer limits. Output: dist-artifact/index.html.
 */
export default defineConfig({
  plugins: [tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  resolve: {
    alias: {
      "@fontsource-variable/inter": fileURLToPath(new URL("./src/lib/nofont.css", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    outDir: "dist-artifact",
    copyPublicDir: false,
  },
});
