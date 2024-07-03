"use client";

import useCategoriesStore from "@/store/useCategoriesStore";
import useProductsStore from "@/store/useProductsStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
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

  const clearAllFilters = () => {
    params.delete("category");
    params.set("min", "0");
    params.set("max", "0");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const { categories, fetchCategories } = useCategoriesStore();
  const { fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const category = params.get("category") || "";
    const page = parseInt(params.get("page") || "1");
    const min = parseInt(params.get("min") || "0");
    const max = parseInt(params.get("max") || "0");

    fetchProducts(category, page, min, max);
    console.log("filter: " + category, page, min, max);
  }, [params, fetchProducts]);

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
        <Select name="sort">
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="asc price">Price (low to high)</SelectItem>
              <SelectItem value="desc price">Price (high to low)</SelectItem>
              <SelectItem value="asc lastUpdated">Newest</SelectItem>
              <SelectItem value="desc lastUpdated">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
