import { defineStore } from "pinia";
import { readonly, ref, computed } from "vue";
import storage from "@/storage.ts";

export interface Session {
  id: string | null;
  name: string | null;
}

const CURRENT_SESSION_KEY = "shopping:session:current";
const PREV_SESSION_HISTORY_KEY = "shopping:sessions";
const SESSION_KEY = (id: string) => `shopping:session:${id}`;
const MAX_SESSIONS = 2046;

function getPreviousSessions() {
  return JSON.parse(storage.getItem(PREV_SESSION_HISTORY_KEY) || "[]") as string[];
}

function getNumberOfSessions() {
  return getPreviousSessions().length;
}

function restoreFromStorage(): Session {
  try {
    const stored = storage.getItem(CURRENT_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored) as Session;
    }
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
  }
  return { id: null, name: null };
}

export const useSessionStore = defineStore("session", () => {
  // 1. Initialization: Hydrate directly to avoid re-renders/flickers
  const initial = restoreFromStorage();
  const sessionId = ref(initial.id);
  const sessionName = ref(initial.name);

  function setSession(name: string) {
    if (getNumberOfSessions() >= MAX_SESSIONS) {
      throw new Error("Too many sessions");
    }
    const _sessionId = crypto.randomUUID();
    sessionId.value = _sessionId;
    sessionName.value = name;
    storage.setItem(CURRENT_SESSION_KEY, JSON.stringify({ id: _sessionId, name: name } satisfies Session));
  }

  function clearSession() {
    if (!sessionId.value) {
      return;
    }
    const session = {
      id: sessionId.value,
      name: sessionName.value,
    };
    const prevSessions = getPreviousSessions();
    storage.setItem(SESSION_KEY(sessionId.value), JSON.stringify(session));
    storage.setItem(PREV_SESSION_HISTORY_KEY, JSON.stringify([...prevSessions, session.id]));
    sessionId.value = null;
    sessionName.value = null;
    storage.removeItem(CURRENT_SESSION_KEY);
  }

  return {
    sessionId: readonly(sessionId),
    sessionName: readonly(sessionName),
    isSessionSet: computed(() => sessionId.value !== null),
    getNumberOfSessions,
    setSession,
    clearSession,
  };
});
