import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";
import storage, { StorageSetItemError } from "@/storage.ts";
import { useHistoryStore } from "./history.ts";

export interface Session {
  id: string | null;
  name: string | null;
  createdAt: number;
}

const CURRENT_SESSION_KEY = "shopping:session:current";
const MAX_SESSIONS = 2046;
const historyStore = useHistoryStore();

function restoreFromStorage(): Session {
  try {
    const stored = storage.getItem(CURRENT_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored) as Session;
    }
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
  }
  return { id: null, name: null, createdAt: 0 };
}

export const useSessionStore = defineStore("session", () => {
  // 1. Initialization: Hydrate directly to avoid re-renders/flickers
  const initial = restoreFromStorage();
  const sessionId = ref(initial.id);
  const sessionName = ref(initial.name);
  const sessionCreatedAt = ref(initial.createdAt);

  function setSession(name: string) {
    if (historyStore.getNumberOfArchivedSessions() >= MAX_SESSIONS) {
      throw new StorageSetItemError(new Error("Too many sessions"));
    }
    const _sessionId = crypto.randomUUID();
    sessionId.value = _sessionId;
    sessionName.value = name;
    sessionCreatedAt.value = Date.now();
    storage.setItem(
      CURRENT_SESSION_KEY,
      JSON.stringify(
        {
          id: _sessionId,
          name: name,
          createdAt: sessionCreatedAt.value,
        } satisfies Session,
      ),
    );
  }

  function clearSession() {
    if (!sessionId.value) {
      return;
    }
    const session = {
      id: sessionId.value,
      name: sessionName.value,
      createdAt: sessionCreatedAt.value,
    } satisfies Session;
    historyStore.archiveSession(sessionId.value, JSON.stringify(session));
    sessionId.value = null;
    sessionName.value = null;
    sessionCreatedAt.value = 0;
    storage.removeItem(CURRENT_SESSION_KEY);
  }

  return {
    sessionId: readonly(sessionId),
    sessionName: readonly(sessionName),
    sessionCreatedAt: readonly(sessionCreatedAt),
    isSessionSet: computed(() => sessionId.value !== null),
    setSession,
    clearSession,
  };
});
