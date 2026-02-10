import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { StorageSetItemError } from "@/storage.ts";
import StorageErrorBoundary from "./StorageErrorBoundary.vue";

const BrokenComponent = {
  template: "<div>Broken</div>",
  setup() {
    throw new StorageSetItemError(new Error("Storage error"));
  },
};

describe("StorageErrorBoundary", () => {
  it("mounts renders properly", async () => {
    const wrapper = mount(StorageErrorBoundary, {
      slots: {
        default: BrokenComponent,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toContain("Storage Capacity Reached");
    expect(wrapper.text()).toContain(
      "You have reached the maximum limit of shopping sessions. To continue shopping, please delete older entries.",
    );
  });
});
