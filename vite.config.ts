import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [deno(), vue(), vueDevTools()],
  server: {
    port: 8080,
    strictPort: true,
  },
  preview: {
    port: 8081,
    strictPort: true,
  },
  resolve: {
    alias: [
      {
        find: "@public/",
        replacement: "/",
      },
    ],
  },
});
