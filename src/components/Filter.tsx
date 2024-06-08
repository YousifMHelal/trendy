"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { getCategories } from "@/data/getCategories";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.replace(pathname);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-12 flex justify-between">
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
                {categories.map(({ name, slug }) => (
                  <SelectItem key={slug} value={slug}>
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
