import storage from "@/storage.ts";

const HISTORY_CART_KEY = (sessionId: string) =>
  `shopping:session:${sessionId}:cart`;
const PREV_SESSION_HISTORY_KEY = "shopping:sessions";
const SESSION_KEY = (id: string) => `shopping:session:${id}`;

function safeParse(json: string | null, defaultValue: unknown) {
  if (!json) {
    return defaultValue;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
    return defaultValue;
  }
}

export function useHistoryStore() {
  function getArchivedSessions() {
    return JSON.parse(
      storage.getItem(PREV_SESSION_HISTORY_KEY) || "[]",
    ) as string[];
  }
  function getNumberOfArchivedSessions() {
    return getArchivedSessions().length;
  }
  function archiveSession(sessionId: string, session: string) {
    storage.setItem(SESSION_KEY(sessionId), session);
    storage.setItem(
      PREV_SESSION_HISTORY_KEY,
      JSON.stringify([getArchivedSessions(), sessionId]),
    );
  }
  function archiveCartItems(sessionId: string, cartItems: string) {
    storage.setItem(HISTORY_CART_KEY(sessionId), cartItems);
  }
  function getSessionsInfo(sessionIds: string[]) {
    sessionIds.map((sessionId) => {
      const session = safeParse(storage.getItem(SESSION_KEY(sessionId)), {
        name: "",
        createdAt: 0,
        id: null,
      });
      const cart = safeParse(storage.getItem(HISTORY_CART_KEY(sessionId)), []);
      return {
        id: null,
        name: session.name,
        createdAt: session.createdAt,
        subTotal: cart.reduce(
          (acc: number, item: { price: number; quantity: number }) =>
            acc + item.price * item.quantity,
          0,
        ),
      };
    }).filter((session) => session.id !== null);
  }
  return {
    getArchivedSessions,
    getNumberOfArchivedSessions,
    archiveSession,
    archiveCartItems,
    getSessionsInfo,
  };
}
