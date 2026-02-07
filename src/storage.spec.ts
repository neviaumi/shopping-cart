import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import storage, { StorageSetItemError } from "./storage.ts";

describe("Storage Wrapper", () => {
  let localStorageMock: Storage;
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};

    // Create a robust mock that mimics localStorage behavior
    localStorageMock = {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value + ""; // Ensure string coercion
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
      length: 0,
    } as unknown as Storage;

    // Define length property getter
    Object.defineProperty(localStorageMock, "length", {
      get: () => Object.keys(store).length,
      configurable: true,
    });

    vi.stubGlobal("localStorage", localStorageMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("setItem", () => {
    it("successfully stores a value", () => {
      const key = "testKey";
      const value = "testValue";

      storage.setItem(key, value);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(key, value);
      expect(localStorageMock.getItem(key)).toBe(value);
    });

    it("throws StorageSetItemError when localStorage throws (e.g., QuotaExceededError)", () => {
      const key = "testKey";
      const value = "testValue";
      const quotaError = new Error("QuotaExceededError");

      // Force setItem to throw
      vi.mocked(localStorageMock.setItem).mockImplementationOnce(() => {
        throw quotaError;
      });

      expect(() => storage.setItem(key, value)).toThrow(StorageSetItemError);

      try {
        storage.setItem(key, value);
      } catch (e) {
        expect(e).toBeInstanceOf(StorageSetItemError);
        expect((e as StorageSetItemError).message).toBe(quotaError.message);
        expect((e as StorageSetItemError).name).toBe("StorageSetItemError");
      }
    });
  });

  describe("getItem", () => {
    it("retrieves an existing value", () => {
      store["existingKey"] = "existingValue";

      const result = storage.getItem("existingKey");

      expect(localStorageMock.getItem).toHaveBeenCalledWith("existingKey");
      expect(result).toBe("existingValue");
    });

    it("returns null for non-existent keys", () => {
      const result = storage.getItem("missingKey");

      expect(localStorageMock.getItem).toHaveBeenCalledWith("missingKey");
      expect(result).toBeNull();
    });
  });

  describe("removeItem", () => {
    it("removes the specified item", () => {
      store["keyToRemove"] = "value";

      storage.removeItem("keyToRemove");

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("keyToRemove");
      expect(store["keyToRemove"]).toBeUndefined();
    });
  });

  describe("clear", () => {
    it("clears all items from storage", () => {
      store["key1"] = "value1";
      store["key2"] = "value2";

      storage.clear();

      expect(localStorageMock.clear).toHaveBeenCalled();
      expect(Object.keys(store)).toHaveLength(0);
    });
  });
});
