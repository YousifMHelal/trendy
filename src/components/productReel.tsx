"use client";

import Link from "next/link";
import ProductCard, { IProduct } from "./ProductCard";
import { useState, useEffect } from "react";
import { getProducts } from "@/data/getProducts";

interface ProductReelProps {
  title: string;
  subTitle?: string;
  href?: string;
  category?: string;
}

const FALLBACK_LIMIT = 6;

const ProductReel = (props: ProductReelProps) => {
  const { title, subTitle, href, category } = props;

  const [limitedProducts, setLimitedProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts(category);
      setProducts(response.products);
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLimitedProducts(products.slice(0, FALLBACK_LIMIT));
    }
  }, [products]); // Update limitedProducts whenever produ

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
          <div className="w-full place-items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 lg:gap-x-8">
            {limitedProducts &&
              limitedProducts.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
