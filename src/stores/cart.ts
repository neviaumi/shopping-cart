import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";
import { useSessionStore } from "./session.ts";
import storage from "@/storage.ts";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
}

const CURRENT_CART_KEY = "shopping:session:current:cart";
const HISTORY_CART_KEY = (sessionId: string) =>
  `shopping:session:${sessionId}:cart`;

function restoreFromStorage(): Cart {
  try {
    const stored = storage.getItem(CURRENT_CART_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
      return { items: [] };
    }
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
  }
  return { items: [] };
}

function assertSessionSet(isSessionSet: boolean) {
  return (sessionId: unknown): sessionId is string => {
    return isSessionSet;
  };
}

export const useCartStore = defineStore("cart", () => {
  // 1. Initialization: Hydrate directly to avoid re-renders/flickers
  const initial = restoreFromStorage();
  const cartItems = ref<CartItem[]>(initial.items);
  const sessionStore = useSessionStore();

  function addItem(item: Omit<CartItem, "id">) {
    if (!sessionStore.isSessionSet) {
      return;
    }
    const itemId = crypto.randomUUID();
    cartItems.value.push({ ...item, id: itemId });
    storage.setItem(CURRENT_CART_KEY, JSON.stringify(cartItems.value));
    return itemId;
  }

  function updateItem(item: CartItem) {
    if (!sessionStore.isSessionSet) {
      return;
    }
    const index = cartItems.value.findIndex((i) => i.id === item.id);
    if (index === -1) {
      return;
    }
    cartItems.value[index] = item;
    storage.setItem(CURRENT_CART_KEY, JSON.stringify(cartItems.value));
  }

  function removeItem(item: CartItem) {
    if (!sessionStore.isSessionSet) {
      return;
    }
    const index = cartItems.value.findIndex((i) => i.id === item.id);
    if (index === -1) {
      return;
    }
    cartItems.value.splice(index, 1);
    storage.setItem(CURRENT_CART_KEY, JSON.stringify(cartItems.value));
  }

  function checkout() {
    if (!assertSessionSet(sessionStore.isSessionSet)(sessionStore.sessionId)) {
      return;
    }
    storage.setItem(
      HISTORY_CART_KEY(sessionStore.sessionId),
      JSON.stringify(cartItems.value),
    );
    cartItems.value = [];
    storage.removeItem(CURRENT_CART_KEY);
    sessionStore.clearSession();
  }

  return {
    items: readonly(cartItems),
    subTotal: computed(() =>
      cartItems.value.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0,
      )
    ),
    checkout,
    addItem,
    updateItem,
    removeItem,
  };
});
