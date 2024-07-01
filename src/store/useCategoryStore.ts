// store/useCategoryStore.ts
import { ICategory } from "@/models/CategoryModels";
import { create } from "zustand";

interface CategoryState {
  category: ICategory | null;
  loading: boolean;
  error: string | null;
  fetchCategory: (slug: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  category: null,
  loading: true,
  error: null,
  fetchCategory: async (slug: string) => {
    console.log(slug);
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/categories/${slug}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch category: ${res.status} ${res.statusText}`
        );
      }

      const category: ICategory = await res.json();
      set({ category, loading: false });
    } catch (error) {
      console.error("Error fetching category:", error);
      set({
        error: `Failed to fetch category: ${error}`,
        loading: false,
      });
    }
  },
}));

export default useCategoryStore;
