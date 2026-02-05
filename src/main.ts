import "unfonts.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify.ts";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.mount("#app");
