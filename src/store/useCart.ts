import { IProduct } from "@/components/ProductCard";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: IProduct;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: IProduct, qty?: number) => void;
  removeItem: (id: string) => void;
  updateItemQty: (id: string, qty: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, qty = 1) =>
        set((state) => {
          const itemIndex = state.items.findIndex(
            (item) => item.product._id === product._id
          );

          if (itemIndex > -1) {
            // If the product already exists, update the quantity
            const updatedItems = state.items.map((item, index) =>
              index === itemIndex ? { ...item, qty: item.qty + qty } : item
            );
            return { items: updatedItems };
          }

          // If the product does not exist, add a new item with the specified quantity
          return { items: [...state.items, { product, qty }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== id),
        })),
      updateItemQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === id ? { ...item, qty } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
