"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

interface ProductReelProps {
  title: string;
  subTitle?: string;
  href?: string;
}

const FALLBACK_LIMIT = 5;

const ProductReel = (props: ProductReelProps) => {
  const { title, subTitle, href } = props;

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && (
            <h1 className="text-2xl font-bold text-primary sm:text-3xl">
              {title}
            </h1>
          )}{" "}
          {subTitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className=" text-sm font-medium text-gray-700 hover:text-gray-500 md:block">
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-6 md:gap-y-10 lg:gap-x-8">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;