"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const ProductCard = ({
  name,
  slug,
  image,
}: {
  name: string;
  slug: string;
  image: string | null;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  null;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 75);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return <ProductPlaceholder />;

  if (isVisible) {
    return (
      <>
        <Link
          className={cn("invisible h-full w-36 cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          href={`/products?category=${slug}`}>
          <div className="flex flex-col w-full">
            <div className="relative bg-input aspect-square w-full overflow-hidden rounded-xl shadow-xl">
              {image && (
                <Image
                  src={image}
                  fill
                  alt="product"
                  className="object-cover rounded-xl"
                />
              )}
            </div>
            <h3 className="mt-4 mx-auto font-medium text-sm text-gray-700">
              {name}
            </h3>
          </div>
        </Link>
      </>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="overflow-x-scroll whitespace-nowrap scrollbar-hide">
      <div className="inline-flex space-x-4 p-4">
        <div className="flex flex-col w-full">
          <div className="relative bg-zinc-100 aspect-square w-36 overflow-hidden rounded-xl">
            <Skeleton className="h-full w-full" />
          </div>
          <Skeleton className="mt-2 mx-auto w-16 h-4 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
