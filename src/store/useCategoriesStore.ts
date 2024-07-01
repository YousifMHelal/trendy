// store/useCategoryStore.ts
import { ICategory } from "@/models/CategoryModels";
import { create } from "zustand";

interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => void;
}

const useCategoriesStore = create<CategoryState>((set) => ({
  categories: [],
  loading: true,
  error: null,
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch categories: ${res.status} ${res.statusText}`
        );
      }

      const data: ICategory[] = await res.json();
      set({ categories: data, loading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({
        error: `Failed to fetch categories: ${error}`,
        loading: false,
      });
    }
  },
}));

export default useCategoriesStore;
