import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "Components/*": path.resolve(__dirname, "./src/components/*"),
      "Contexts/*": path.resolve(__dirname, "./src/contexts/*"),
      "Models/*": path.resolve(__dirname, "./src/models/*"),
      "Routes/*": path.resolve(__dirname, "./src/routes/*"),
      "Styles/*": path.resolve(__dirname, "./src/styles/*"),
      "Utils/*": path.resolve(__dirname, "./src/utils/*"),
      "Langs/*": path.resolve(__dirname, "./src/langs/*"),
    },
  },
  plugins: [
    react(),
    electron({
      // Shortcut of `build.lib.entry`.
      entry: {
        main: "electron/main.ts",
        preload: path.join(__dirname, "electron/preload.ts"),
      },
      // // Ployfill the Electron and Node.js API for Renderer process.
      // // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      // renderer:
      //   process.env.NODE_ENV === "test"
      //     ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
      //       undefined
      //     : {},
      vite: {
        build: {
          outDir: path.join(__dirname, "dist-electron"),
          emptyOutDir: true,
          rollupOptions: {
            external: ["better-sqlite3", "sqlite3"],
            output: {
              format: "cjs", // Force le format CJS
            },
          },
        },
      },
    }),
  ],
});
