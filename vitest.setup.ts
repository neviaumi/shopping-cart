import { config } from "@vue/test-utils";
import vuetify from "@/plugins/vuetify.ts";
import router from "@/plugins/router.ts";
import { createPinia } from "pinia";

// Inject it globally into Vue Test Utils
config.global.plugins = [vuetify, createPinia(), router];

// Pro-Tip: Mock ResizeObserver (Vuetify components often need this to avoid errors)
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
