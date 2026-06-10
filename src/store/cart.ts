import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  nameKey: "product1" | "product2";
  priceUsd: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [
        { id: "1", nameKey: "product1", priceUsd: 59.99, quantity: 1 },
        { id: "2", nameKey: "product2", priceUsd: 24.5, quantity: 2 },
      ],
      increment: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "user-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : sessionStorage
      ),
    }
  )
);
