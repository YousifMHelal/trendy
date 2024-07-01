import { IProduct } from "@/components/ProductCard";
import create from "zustand";

interface ProductStore {
  products: IProduct[];
  deleteProduct: (slug: string) => Promise<void>;
}

const useDeleteProduct = create<ProductStore>((set) => ({
  products: [],
  deleteProduct: async (slug: string) => {
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          products: state.products.filter((product) => product.slug !== slug),
        }));
      } else {
        console.error("Failed to delete product:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
}));

export default useDeleteProduct;
