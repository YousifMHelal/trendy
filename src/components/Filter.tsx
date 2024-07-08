"use client";

import useCategoriesStore from "@/store/useCategoriesStore";
import useProductsStore from "@/store/useProductsStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const { categories, fetchCategories } = useCategoriesStore();
  const { fetchProducts, sortBy, order } = useProductsStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const category = params.get("category") || "";
    const page = parseInt(params.get("page") || "1");
    const min = parseInt(params.get("min") || "0");
    const max = parseInt(params.get("max") || "0");

    if (category !== null && sortBy !== null && order !== null) {
      fetchProducts(category, page, min, max, sortBy, order);
    }
  }, [params, fetchProducts, sortBy, order]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectChange = (value: string) => {
    params.set("category", value);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const [newOrder, newSortBy] = value.split(" ");
    fetchProducts(
      undefined,
      undefined,
      undefined,
      undefined,
      newSortBy,
      newOrder
    );
  };

  const clearAllFilters = () => {
    params.delete("category");
    params.delete("min");
    params.delete("max");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex justify-between">
      <div className="flex gap-4 flex-wrap">
        {/* Filter Categories */}
        <div className="w-28">
          <Select name="category" onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map(({ _id, name, slug }) => (
                  <SelectItem key={_id} value={slug}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="number"
          min={0}
          name="min"
          placeholder="min price"
          className="w-28"
          onChange={handleFilterChange}
        />
        <Input
          type="number"
          min={0}
          name="max"
          placeholder="max price"
          className="w-28"
          onChange={handleFilterChange}
        />

        <Button size={"lg"} onClick={clearAllFilters}>
          Clear
        </Button>
      </div>
      <div className="w-44">
        <Select name="sort" onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="asc price">Price (low to high)</SelectItem>
              <SelectItem value="desc price">Price (high to low)</SelectItem>
              <SelectItem value="asc createdAt">Oldest</SelectItem>
              <SelectItem value="desc createdAt">Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
