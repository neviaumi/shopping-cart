import "unfonts.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify.ts";
import App from "./App.vue";
import { router } from "./plugins/router.ts";

const app = createApp(App).use(createPinia()).use(vuetify).use(router);
app.mount("#app");
