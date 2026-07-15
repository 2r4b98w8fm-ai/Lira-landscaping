import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

/**
 * Single-file build: `npm run build:single` → dist-single/index.html.
 * Everything — all fifteen cases, styles, fonts — inlined into one HTML
 * file that runs from a double-click (file://), an email attachment, or
 * any static host. No server, no other files.
 */
export default defineConfig({
  plugins: [
    tailwindcss(),
    viteSingleFile({ removeViteModuleLoader: true }),
    {
      // The single file has no sibling assets — drop manifest/icon links and
      // give it an inline favicon so file:// usage is 404-free.
      name: "singlefile-clean-head",
      transformIndexHtml(html) {
        return html
          .replace(/^\s*<link rel="manifest"[^>]*>\n?/m, "")
          .replace(
            /<link rel="icon"[^>]*>/,
            `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='112' fill='%230a0c0f'/%3E%3Crect x='156' y='86' width='200' height='340' rx='32' fill='none' stroke='%237fd8c4' stroke-width='18'/%3E%3Ccircle cx='256' cy='236' r='52' fill='none' stroke='%237fd8c4' stroke-width='14'/%3E%3Cpath d='M294 274l40 40' stroke='%237fd8c4' stroke-width='14' stroke-linecap='round'/%3E%3C/svg%3E" />`,
          );
      },
    },
  ],
  build: {
    target: "es2020",
    outDir: "dist-single",
    copyPublicDir: false,
  },
});
