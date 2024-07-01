"use client";

import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import ProductsPagination from "@/components/ProductsPagination";
import WidthContainer from "@/components/WidthContainer";
import { Skeleton } from "@/components/ui/skeleton";
import useProductsStore from "@/store/useProductsStore";
import { LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";

const Page = ({ searchParams }: any) => {
  const category = searchParams.category || "";
  const page = parseInt(searchParams.page) || 1;
  const { productsData, fetchProducts, loading } = useProductsStore();
  const { products, count } = productsData;

  useEffect(() => {
    fetchProducts(category, page);
  }, [fetchProducts, page, category]);

  const PRODUCTS_PER_PAGE = 24;
  const hasPrev = PRODUCTS_PER_PAGE * (page - 1) > 0;
  const hasNext = PRODUCTS_PER_PAGE * (page - 1) + PRODUCTS_PER_PAGE < count;

  return (
    <WidthContainer className="min-h-screen">
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      {products && (
        <h1 className="mt-12 mb-8 text-xl font-semibold capitalize">{`${
          category || "All"
        } Products For You!`}</h1>
      )}

      {loading ? (
        <div className="w-full place-items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 lg:gap-x-8">
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-40 w-40" />
        </div>
      ) : (
        <div className="w-full place-items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 lg:gap-x-8">
          {products ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="w-[80vw] h-48 mt-14 ">
              <h1 className="w-full uppercase font-semibold text-2xl text-center">
                There is no products in this category...
              </h1>
            </div>
          )}
        </div>
      )}

      <div className="mt-10">
        <ProductsPagination hasNext={hasNext} hasPrev={hasPrev} page={page} />
      </div>
    </WidthContainer>
  );
};

export default Page;
