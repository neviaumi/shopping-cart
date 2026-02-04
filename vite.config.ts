import { defineConfig, type Plugin } from "vite";
import deno from "@deno/vite-plugin";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Vuetify from "vite-plugin-vuetify";
import Unfonts from "unplugin-fonts/vite";
import type { Options as UnFontsOptions } from "unplugin-fonts/dist/types";

function isVitePluginFactory<T>(
  pluginCreator: unknown,
): pluginCreator is (options: T) => Plugin | Plugin[] {
  if (typeof pluginCreator === "function") return true;
  return false;
}

export default defineConfig({
  plugins: [
    deno(),
    vue(),
    vueDevTools(),
    Vuetify({
      autoImport: true,
    }),
    isVitePluginFactory<UnFontsOptions>(Unfonts) && Unfonts({
      fontsource: {
        families: [
          {
            name: "Roboto",
            weights: [100, 300, 400, 500, 700, 900],
            styles: ["normal", "italic"],
          },
        ],
      },
    }),
  ],
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
