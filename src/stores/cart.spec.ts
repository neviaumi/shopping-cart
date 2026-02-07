import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "./cart.ts";
import { useSessionStore } from "./session.ts";
import storage from "@/storage.ts";

// Mock crypto for deterministic IDs only - no storage mocks
const mockUUID = "item-uuid-123";
const mockSessionUUID = "session-uuid-456";

describe("Cart Store Integration", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        storage.clear(); // Reset native HappyDOM storage
        vi.clearAllMocks();

        // Setup crypto mock for deterministic functional verification
        const randomUUID = vi.fn()
            .mockReturnValueOnce(mockSessionUUID) // For session creation
            .mockReturnValue(mockUUID);           // For item creation

        vi.stubGlobal("crypto", { randomUUID });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("initializes to default empty state", () => {
        const cart = useCartStore();
        expect(cart.items).toEqual([]);
        expect(localStorage.getItem("shopping:session:current:cart")).toBeNull();
    });

    it("hydrates items correctly from pre-existing storage", () => {
        const storedItems = [{ id: "1", name: "Apple", price: 10, quantity: 1 }];
        localStorage.setItem("shopping:session:current:cart", JSON.stringify(storedItems));

        const cart = useCartStore();
        expect(cart.items).toEqual(storedItems);
    });

    it("blocks actions when no session is active", () => {
        const cart = useCartStore();

        // Confirm no session
        expect(localStorage.getItem("shopping:session:current")).toBeNull();

        // Attempt add
        cart.addItem({ name: "Apple", price: 10, quantity: 1 });

        expect(cart.items).toHaveLength(0);
        expect(localStorage.getItem("shopping:session:current:cart")).toBeNull();
    });

    it("persists added items to localStorage", () => {
        const session = useSessionStore();
        const cart = useCartStore();
        session.setSession("Integrated Session");

        const newItem = { name: "Orange", price: 5, quantity: 2 };
        cart.addItem(newItem);

        // Verify Store State
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0]).toEqual(expect.objectContaining(newItem));

        // Verify Storage Integration
        const stored = localStorage.getItem("shopping:session:current:cart");
        expect(JSON.parse(stored!)).toEqual(cart.items);
    });

    it("updates item quantity and syncs to storage", () => {
        const session = useSessionStore();
        const cart = useCartStore();
        session.setSession("Integrated Session");

        const itemId = cart.addItem({ name: "Banana", price: 2, quantity: 1 });
        const item = cart.items.find(i => i.id === itemId)!;

        cart.updateItem({ ...item, quantity: 5 });

        // Verify Store State
        expect(cart.items[0].quantity).toBe(5);

        // Verify Storage Integration
        const stored = JSON.parse(localStorage.getItem("shopping:session:current:cart")!);
        expect(stored[0].quantity).toBe(5);
    });

    it("removes items and updates storage", () => {
        const session = useSessionStore();
        const cart = useCartStore();
        session.setSession("Integrated Session");

        const itemId = cart.addItem({ name: "Grapes", price: 8, quantity: 1 });
        const item = cart.items.find(i => i.id === itemId)!;

        cart.removeItem(item);

        expect(cart.items).toHaveLength(0);
        expect(JSON.parse(localStorage.getItem("shopping:session:current:cart")!)).toEqual([]);
    });

    it("processes checkout: archives cart, clears current cart, and resets session", () => {
        const session = useSessionStore();
        const cart = useCartStore();
        session.setSession("Integrated Session");

        // Add items
        cart.addItem({ name: "Milk", price: 3, quantity: 1 });
        const itemsSnapshot = [...cart.items];

        // Perform Checkout
        cart.checkout();

        // 1. Verify Cart is Empty
        expect(cart.items).toHaveLength(0);

        // 2. Verify Session is Cleared
        expect(session.isSessionSet).toBe(false);

        // 3. Verify Current Cart Removed from Storage
        expect(localStorage.getItem("shopping:session:current:cart")).toBeNull();

        // 4. Verify History Cart Archived in Storage
        const historyKey = `shopping:session:${mockSessionUUID}:cart`;
        const historyStored = localStorage.getItem(historyKey);
        expect(historyStored).not.toBeNull();
        expect(JSON.parse(historyStored!)).toEqual(itemsSnapshot);
    });
});
