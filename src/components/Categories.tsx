"use client";

import { useEffect, useRef } from "react";
import CategoryCard from "./CategoryCard";
import WidthContainer from "./WidthContainer";

interface props {
  categories: [
    {
      name: string;
      image: string;
    }
  ];
}

const Categories = ({ categories }: props) => {
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        event.preventDefault();
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <section className="py-10">
      <WidthContainer>
        <div className="flex items-center justify-between mb-4">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold text-primary sm:text-3xl">
              Categories
            </h1>
          </div>
        </div>
      </WidthContainer>
      <div
        ref={scrollContainerRef}
        className="overflow-x-scroll whitespace-nowrap scrollbar-hide">
        <div className="inline-flex space-x-4 p-4">

          {
            categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                image={category.image}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Categories;
