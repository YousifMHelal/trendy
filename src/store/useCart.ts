import { IProduct } from "@/components/ProductCard";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: IProduct;
};

type CartState = {
  items: CartItem[];
  addItem: (product: IProduct) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.product._id === product._id
          );
          if (exists) {
            return state; // Return the current state if the product already exists
          }
          return { items: [...state.items, { product }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
