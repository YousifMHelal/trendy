"use client";

import Filter from "@/components/Filter";
import { IProduct } from "@/components/ProductCard";
import ProductsPagination from "@/components/ProductsPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import useDeleteProduct from "@/store/useDeleteProduct";
import useProductsStore from "@/store/useProductsStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IoStorefront } from "react-icons/io5";

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
    <section className="flex flex-col">
      {/* page information */}
      <Filter />
      {loading ? (
        <Loader2 className="animate-spin mt-44 mx-auto h-12 w-12 text-muted-background" />
      ) : (
        <Table>
          <TableCaption>A list of Products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map(
                ({
                  _id,
                  images,
                  title,
                  description,
                  price,
                  quantity,
                  slug,
                  createdAt,
                }: IProduct) => (
                  <TableRow key={_id}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <div className="relative w-8 h-8">
                        {images && (
                          <Image
                            src={images[0]}
                            alt=""
                            className="rounded-full"
                            fill
                          />
                        )}
                      </div>
                      <span className="font-medium">
                        {title.substring(0, 18) + "..."}
                      </span>
                    </TableCell>
                    <TableCell>
                      {description.substring(0, 40) + "..."}
                    </TableCell>
                    <TableCell>{formatPrice(price)}</TableCell>
                    <TableCell>
                      {new Date(createdAt).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Link
                          className={buttonVariants({ variant: "secondary" })}
                          href="/">
                          view
                        </Link>
                        <Link
                          className={buttonVariants({
                            variant: "destructive",
                          })}
                          href="/">
                          delete
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      )}
      <div className="my-10">
        <ProductsPagination hasNext={hasNext} hasPrev={hasPrev} page={page} />
      </div>
    </section>
  );
};

export default Page;
