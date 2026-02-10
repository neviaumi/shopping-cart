import { defineConfig, type Plugin } from "vite";
import deno from "@deno/vite-plugin";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Vuetify from "vite-plugin-vuetify";
import Unfonts from "unplugin-fonts/vite";
import type { Options as UnFontsOptions } from "unplugin-fonts/dist/types";
import { VitePWA } from "vite-plugin-pwa";

function isVitePluginFactory<T>(
  pluginCreator: unknown,
): pluginCreator is (options: T) => Plugin | Plugin[] {
  if (typeof pluginCreator === "function") return true;
  return false;
}

export default defineConfig(({ mode }) => {
  return {
    base: "/shopping-cart/",
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
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: mode === "pwa",
        },
        workbox: {
          navigateFallback: "/shopping-cart/index.html",
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,jpg,woff2,woff,ttf,eot}",
          ],
          ignoreURLParametersMatching: [/^v$/, /^__WB_REVISION__$/],
        },
        manifest: {
          name: "Shopping Cart",
          start_url: "/shopping-cart/",
          short_name: "Shopping Cart",
          theme_color: "#ffffff",
          icons: [
            { src: "icons/128.png", sizes: "128x128", type: "image/png" },
            { src: "icons/192.png", sizes: "192x192", type: "image/png" },
            { src: "icons/256.png", sizes: "256x256", type: "image/png" },
            { src: "icons/512.png", sizes: "512x512", type: "image/png" },
            { src: "icons/768.png", sizes: "768x768", type: "image/png" },
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
        {
          find: "@/",
          replacement: "/src/",
        },
      ],
    },
  };
});
