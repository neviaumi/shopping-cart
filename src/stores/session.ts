import { defineStore } from "pinia";
import { readonly, ref, watch } from "vue";

export interface Session {
  sessionId: string | null;
  sessionName: string | null;
}

const STORAGE_KEY = "shopping:session:current";

function getStoredSession(): Session {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Session;
    }
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
  }
  return { sessionId: null, sessionName: null };
}

export const useSessionStore = defineStore("session", () => {
  // 1. Initialization: Hydrate directly to avoid re-renders/flickers
  const initial = getStoredSession();
  const sessionId = ref<string | null>(initial.sessionId || null);
  const sessionName = ref<string | null>(initial.sessionName || null);

  // 2. Sync Strategy: Efficiently watch for changes
  watch(
    [sessionId, sessionName],
    ([newId, newName]) => {
      try {
        if (!newId && !newName) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              sessionId: newId,
              sessionName: newName,
            }),
          );
        }
      } catch (e) {
        console.error("Failed to save session to localStorage", e);
      }
    },
    // No 'deep: true' needed for primitive refs in array
  );

  function setSession(name: string) {
    sessionId.value = crypto.randomUUID();
    sessionName.value = name;
  }

  function clearSession() {
    sessionId.value = null;
    sessionName.value = null;
    // Watcher handles localStorage removal
  }

  return {
    sessionId: readonly(sessionId),
    sessionName: readonly(sessionName),
    setSession,
    clearSession,
  };
});
