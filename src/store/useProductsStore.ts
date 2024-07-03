import { create } from "zustand";
import { IProduct } from "@/components/ProductCard";

interface ProductsData {
  products: IProduct[];
  count: number;
}

interface ProductState {
  productsData: ProductsData;
  fetchProducts: (
    category?: string,
    page?: number,
    min?: number,
    max?: number
  ) => void;
  loading: boolean;
  error: string | null;
}

const useProductsStore = create<ProductState>((set) => ({
  productsData: { products: [], count: 0 },
  loading: true,
  error: null,
  fetchProducts: async (
    category?: string,
    page?: number,
    min?: number,
    max?: number
  ) => {
    set({ loading: true, error: null });
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/products/`);
      url.searchParams.append("page", page?.toString() || "1");
      if (category) url.searchParams.append("category", category);
      if (min !== undefined) url.searchParams.append("min", min.toString());
      if (max !== undefined) url.searchParams.append("max", max.toString());

      console.log("store: " + category, page, min, max);

      const res = await fetch(url.toString(), { cache: "no-store" });

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
