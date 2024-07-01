// store/useProductStore.ts
import { IProduct } from "@/components/ProductCard";
import { create } from "zustand";

interface ProductState {
  product: IProduct | null;
  loading: boolean;
  error: string | null;
  fetchProduct: (slug: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  product: null,
  loading: true,
  error: null,
  fetchProduct: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products/${slug}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch product: ${res.status} ${res.statusText}`
        );
      }

      const product: IProduct = await res.json();
      set({ product, loading: false });
    } catch (error) {
      console.error("Error fetching product:", error);
      set({
        error: `Failed to fetch product: ${error}`,
        loading: false,
      });
    }
  },
}));

export default useProductStore;
