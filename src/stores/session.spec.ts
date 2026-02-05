import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "./session.ts";

describe("Session Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("initializes with null state", () => {
    const store = useSessionStore();
    expect(store.sessionId).toBeNull();
    expect(store.sessionName).toBeNull();
  });

  it("sets session correctly with auto-generated ID", () => {
    const store = useSessionStore();
    // Mock crypto.randomUUID
    const mockUUID = "test-uuid-123";
    globalThis.crypto.randomUUID = vi.fn(() => mockUUID);

    store.setSession("Test Session");

    expect(store.sessionId).toBe(mockUUID);
    expect(store.sessionName).toBe("Test Session");
  });

  it("persists to localStorage on change", async () => {
    const store = useSessionStore();
    const mockUUID = "test-uuid-123";
    globalThis.crypto.randomUUID = vi.fn(() => mockUUID);

    store.setSession("Test Session");

    // Wait for watch to trigger
    await new Promise((resolve) => setTimeout(resolve, 0));

    const stored = localStorage.getItem("shopping:session:current");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.sessionId).toBe(mockUUID);
    expect(parsed.sessionName).toBe("Test Session");
  });

  it("hydrates from localStorage on init", () => {
    localStorage.setItem(
      "shopping:session:current",
      JSON.stringify({ sessionId: "456", sessionName: "Hydrated Session" }),
    );

    const store = useSessionStore();

    expect(store.sessionId).toBe("456");
    expect(store.sessionName).toBe("Hydrated Session");
  });

  it("clears session and localStorage", () => {
    const store = useSessionStore();
    store.setSession("To Clear");

    store.clearSession();

    expect(store.sessionId).toBeNull();
    expect(store.sessionName).toBeNull();
    expect(localStorage.getItem("shopping:session:current")).toBeNull();
  });
});
