import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "./session.ts";
import storage from "@/storage.ts";

describe("Session Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    storage.clear();
  });

  it("initializes with null state when storage is empty", () => {
    const store = useSessionStore();
    expect(store.sessionId).toBeNull();
    expect(store.sessionName).toBeNull();
    expect(store.isSessionSet).toBe(false);
  });

  it("hydrates from existing localStorage data", () => {
    const existingSession = { id: "test-id", name: "Existing User" };
    storage.setItem("shopping:session:current", JSON.stringify(existingSession));

    const store = useSessionStore();

    expect(store.sessionId).toBe("test-id");
    expect(store.sessionName).toBe("Existing User");
    expect(store.isSessionSet).toBe(true);
  });

  it("persists new session to localStorage", () => {
    const store = useSessionStore();

    store.setSession("New User");

    // Verify store state
    expect(store.sessionId).toBeDefined();
    expect(store.sessionName).toBe("New User");
    expect(store.isSessionSet).toBe(true);

    // Verify persistence (side-effect)
    const storedJson = storage.getItem("shopping:session:current");
    expect(storedJson).not.toBeNull();

    const stored = JSON.parse(storedJson!);
    expect(stored.id).toBe(store.sessionId); // Match generated ID
    expect(stored.name).toBe("New User");
  });

  it("clears session and archives it to history", () => {
    // 1. Setup active session
    const store = useSessionStore();
    store.setSession("Session to Archive");
    const originalId = store.sessionId!;

    // 2. Clear Session
    store.clearSession();

    // 3. Verify Store State
    expect(store.sessionId).toBeNull();
    expect(store.sessionName).toBeNull();
    expect(store.isSessionSet).toBe(false);

    // 4. Verify Persistence Side-Effects
    // Current session removed
    expect(storage.getItem("shopping:session:current")).toBeNull();

    // Archived session exists
    const archivedJson = storage.getItem(`shopping:session:${originalId}`);
    expect(archivedJson).not.toBeNull();
    const archived = JSON.parse(archivedJson!);
    expect(archived.id).toBe(originalId);
    expect(archived.name).toBe("Session to Archive");

    // History list updated
    const historyJson = storage.getItem("shopping:sessions");
    expect(historyJson).not.toBeNull();
    const history = JSON.parse(historyJson!);
    expect(history).toContain(originalId);
  });

  it("enforces session limit restriction", () => {
    // Fill storage with max sessions (2046)
    // We simulate this directly in localStorage to bypass store logic overhead
    const maxSessions = Array(2046).fill("session-id");
    storage.setItem("shopping:sessions", JSON.stringify(maxSessions));

    const store = useSessionStore();

    expect(() => store.setSession("Overflow Session")).toThrow("Too many sessions");
  });
});
