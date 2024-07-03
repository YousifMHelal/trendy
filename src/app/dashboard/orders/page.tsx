"use client";

import ProductsPagination from "@/components/ProductsPagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOrdersStore from "@/store/useGetOrders";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Page = ({ searchParams }: any) => {
  const page = parseInt(searchParams.page) || 1;
  const { ordersData, fetchOrders, loading } = useOrdersStore();
  const { orders, count } = ordersData;

  console.log(orders);

  useEffect(() => {
    fetchOrders(page);
  }, [fetchOrders, page]);

  const PRODUCTS_PER_PAGE = 24;
  const hasPrev = PRODUCTS_PER_PAGE * (page - 1) > 0;
  const hasNext = PRODUCTS_PER_PAGE * (page - 1) + PRODUCTS_PER_PAGE < count;

  return (
    <section className="flex flex-col">
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
          <TableBody></TableBody>
        </Table>
      )}
      <div className="my-10">
        <ProductsPagination hasNext={hasNext} hasPrev={hasPrev} page={page} />
      </div>
    </section>
  );
};

export default Page;
