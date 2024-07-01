"use client";

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
import { ICategory } from "@/models/CategoryModels";
import useCategoriesStore from "@/store/useCategoriesStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IoStorefront } from "react-icons/io5";

const Page = () => {
  const { categories, fetchCategories, loading } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="flex flex-col">
      {/* Page information */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <IoStorefront size={20} />
          <p className="text-xl">Categories</p>
        </div>
        <Button size={"lg"}>Add new</Button>
      </div>

      {/* products table */}
      {loading ? (
        <Loader2 className="animate-spin mt-44 mx-auto h-12 w-12 text-muted-background" />
      ) : (
        <Table>
          <TableCaption>A list of Categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map(({ _id, image, name, createdAt }: ICategory) => (
              <TableRow key={_id}>
                <TableCell className="flex items-center gap-2 font-medium">
                  <div className="relative w-8 h-8">
                    {image && (
                      <Image src={image} alt="" className="rounded-full" fill />
                    )}
                  </div>
                  <span className="font-medium">{name}</span>
                </TableCell>
                <TableCell>
                  {new Date(createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Link
                      className={buttonVariants({ variant: "secondary" })}
                      href="/">
                      view
                    </Link>
                    <Link
                      className={buttonVariants({ variant: "destructive" })}
                      href="/">
                      delete
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default Page;
