import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import WidthContainer from "@/components/WidthContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

export const getProducts = async (category: string | undefined) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products/?category=${
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const Page = async ({ searchParams }: any) => {
  const category = searchParams.category || "";
  const products = await getProducts(category);

  return (
    <WidthContainer>
      {/* CAMPAIGN */}
      <div className="hidden bg-[#e8e5d6] px-4 sm:flex justify-between lg:h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8 py-4">
          <h1 className="text-2xl lg:text-4xl font-semibold leading-[48px] text-gray-700 text-center">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <Button className="rounded-3xl text-white w-max py-3 px-5 text-sm">
            Buy Now
          </Button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 mb-8 text-xl font-semibold">
        cat collection name For You!
      </h1>
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-6 md:gap-y-10 lg:gap-x-8">
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </WidthContainer>
  );
};

export default Page;
