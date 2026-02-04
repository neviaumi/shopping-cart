import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "happy-dom",
      exclude: configDefaults.exclude,
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  }),
);

// export default defineConfig({
//   test: {
//     // environment: "jsdom",
//     exclude: configDefaults.exclude,
//     root: fileURLToPath(new URL("./", import.meta.url)),
//   },
// });
