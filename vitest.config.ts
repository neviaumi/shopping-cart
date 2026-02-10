import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default defineConfig((configEnv) => {
  return mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        maxWorkers: 1,
        globals: true,
        setupFiles: ["./vitest.setup.ts"], // Path to the file created in Step 1
        css: false,
        environment: "happy-dom",
        exclude: configDefaults.exclude,
        root: fileURLToPath(new URL("./", import.meta.url)),
        server: {
          deps: {
            inline: ["vuetify"],
          },
        },
      },
    }),
  );
});
