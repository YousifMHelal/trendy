"use client";

import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import mongoose from "mongoose";

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  slug: string;
  images: string[];
  category: {
    type: mongoose.Schema.Types.ObjectId;
  };
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return <ProductPlaceholder />;

  if (isVisible) {
    return (
      <>
        <Link
          className={cn("invisible h-full w-40 cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          href={`/products/${product.slug}`}>
          <div className="flex flex-col w-full">
            <div className="relative shadow-xl aspect-square w-full overflow-hidden rounded-xl">
              {product.images && (
                <Image
                  src={product.images[0]}
                  fill
                  alt="product"
                  className="object-contain p-3"
                />
              )}
            </div>
            <h3 className="mt-4 font-medium text-sm text-gray-700">
              {product.title.length > 18
                ? product.title.substring(0, 18) + "..."
                : product.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 lowercase">
              {product.description.length > 18
                ? product.description.substring(0, 36) + "..."
                : product.description}
            </p>
            <p className="mt-1 font-medium text-sm text-gray-900">
              {formatPrice(product.price || 0)}
            </p>
          </div>
        </Link>
      </>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductCard;
