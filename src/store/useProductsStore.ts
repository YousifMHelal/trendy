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
    max?: number,
    sortBy?: string,
    order?: string
  ) => void;
  loading: boolean;
  error: string | null;
  sortBy: string | null;
  order: string | null;
}

const useProductsStore = create<ProductState>((set) => ({
  productsData: { products: [], count: 0 },
  loading: false,
  error: null,
  sortBy: null,
  order: null,
  fetchProducts: async (
    category?: string,
    page?: number,
    min?: number,
    max?: number,
    sortBy?: string,
    order?: string
  ) => {
    set({ loading: true, error: null });
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/products/`);
      url.searchParams.append("page", page?.toString() || "1");
      if (category) url.searchParams.append("category", category); // Ensure category is appended correctly
      if (min !== undefined) url.searchParams.append("min", min.toString());
      if (max !== undefined) url.searchParams.append("max", max.toString());
      if (sortBy) url.searchParams.append("sortBy", sortBy);
      if (order) url.searchParams.append("order", order);

      const res = await fetch(url.toString(), { cache: "no-store" });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch products: ${res.status} ${res.statusText}`
        );
      }

      const data: { products: IProduct[]; count: number } = await res.json();
      set({ productsData: data, loading: false, sortBy, order });
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
