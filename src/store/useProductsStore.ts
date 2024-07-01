import { create } from "zustand";
import { IProduct } from "@/components/ProductCard";

interface ProductsData {
  products: IProduct[];
  count: number;
}

interface ProductState {
  productsData: ProductsData;
  fetchProducts: (category?: string, page?: number) => void;
  loading: boolean;
  error: string | null;
}

const useProductsStore = create<ProductState>((set) => ({
  productsData: { products: [], count: 0 },
  loading: true,
  error: null,
  fetchProducts: async (category?: string, page?: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products/?page=${page}&category=${
          category || " "
        }`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch products: ${res.status} ${res.statusText}`
        );
      }

      const data: { products: IProduct[]; count: number } = await res.json();
      set({ productsData: data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({
        error: `Failed to fetch products: ${error}`,
        loading: false,
      });
    }
  },
}));

export default useProductsStore;
