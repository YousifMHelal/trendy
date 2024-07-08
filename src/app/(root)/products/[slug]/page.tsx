"use client";

import AddToCartButton from "@/components/AddToCartButton";
import ProductImages from "@/components/ProductImages";
import WidthContainer from "@/components/WidthContainer";
import ProductReel from "@/components/productReel";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import useProductStore from "@/store/useProductStore";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: ProductPageProps) => {
  const { slug } = params;
  const { product, fetchProduct, loading } = useProductStore();

  useEffect(() => {
    if (slug) {
      fetchProduct(slug as string);
    }
  }, [fetchProduct, slug]);

  return (
    <WidthContainer className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-18 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-24 lg:px-4">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            {/* Breadcrumbs */}
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900">
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300">
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            {/* product information */}
            <div>
              {loading ? (
                <div className="space-y-2 mt-3">
                  <Skeleton className="h-4 w-[450px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              ) : (
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {product?.title}
                </h1>
              )}
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {product && formatPrice(product.price)}
                </p>
                <div className="ml-4 border-l text-muted-foreground capitalize border-gray-300 pl-4">
                  {product?.category.toString()}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-foreground">
                  {product && product.quantity > 0
                    ? " In stock"
                    : "Out of stock"}
                </p>
              </div>

              {loading ? (
                <div className="space-y-2 mt-10">
                  <Skeleton className="h-4 w-[500px]" />
                  <Skeleton className="h-4 w-[500px]" />
                  <Skeleton className="h-4 w-[500px]" />
                  <Skeleton className="h-4 w-[500px]" />
                  <Skeleton className="h-4 w-[500px]" />
                  <Skeleton className="h-4 w-[500px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              ) : (
                <div className="mt-4 space-y-6">
                  <p className="text-base text-muted-foreground">
                    {product?.description}
                  </p>
                </div>
              )}

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Delivery within 3 days
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-[300px] w-[500px]" />
                <div className="flex justify-between gap-4">
                  <Skeleton className="w-1/4 h-32" />
                  <Skeleton className="w-1/4 h-32" />
                  <Skeleton className="w-1/4 h-32" />
                </div>
              </div>
            ) : (
              <div className="aspect-square rounded-lg">
                {product && <ProductImages images={product.images} />}
              </div>
            )}
          </div>

          {/* add to cart part */}
          <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-8">
                {product && <AddToCartButton product={product} />}
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    14 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href={`/products/?category=${product?.category}`}
        title={`Similar`}
        subTitle={`Browse similar high-quality products just like ${product?.category}`}
        category={product?.category.toString()}
      />
    </WidthContainer>
  );
};

export default Page;
