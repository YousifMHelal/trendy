export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategory = async (slug: string) => {
  console.log(slug);
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

    const category = await res.json();
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
