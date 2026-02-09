import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import storage, { StorageSetItemError } from "@/storage.ts";
import StorageErrorBoundary from "./StorageErrorBoundary.vue";

const BrokenComponent = {
  template: "<div>Broken</div>",
  setup() {
    throw new StorageSetItemError(new Error("Storage error"));
  },
};

describe("StorageErrorBoundary", () => {
  it("mounts renders properly", () => {
    const wrapper = mount(StorageErrorBoundary, {
      slots: {
        default: BrokenComponent,
      },
    });
    expect(wrapper.text()).toContain("Storage Capacity Reached");
    expect(wrapper.text()).toContain(
      "You have reached the maximum limit of shopping sessions. To continue shopping, please delete older entries.",
    );
  });
});
