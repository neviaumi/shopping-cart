import { config } from "@vue/test-utils";
import vuetify from "@/plugins/vuetify.ts";

// Inject it globally into Vue Test Utils
config.global.plugins = [vuetify];

// Pro-Tip: Mock ResizeObserver (Vuetify components often need this to avoid errors)
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
