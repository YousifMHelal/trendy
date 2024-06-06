export const getProducts = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (slug: any) => {
  console.log(slug);
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

    const product = await res.json();
    console.log(product);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
