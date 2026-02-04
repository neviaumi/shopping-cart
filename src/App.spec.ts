import { describe, expect, it } from "vitest";
import vuetify from "./plugins/vuetify.ts";
import { mount } from "@vue/test-utils";
import App from "./App.vue";

describe("App", () => {
  it("mounts renders properly", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.text()).toContain("FooBar");
  });
});
