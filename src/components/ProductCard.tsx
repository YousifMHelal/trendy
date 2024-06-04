"use client";

import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import mongoose from "mongoose";

interface IProduct {
  title: string;
  description: string;
  price: number;
  quantity: number;
  slug: string;
  images: [
    {
      type: string;
    }
  ];
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
          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          href={`/product/`}>
          <div className="flex flex-col w-full">
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
              <Image src="" fill alt="product" />
            </div>
            <h3 className="mt-4 font-medium text-sm text-gray-700">
              title
            </h3>
            <p className="mt-1 text-sm text-gray-500">roduc</p>
            <p className="mt-1 font-medium text-sm text-gray-900">
              {formatPrice(50)}
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
