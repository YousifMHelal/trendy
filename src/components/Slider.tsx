"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";

const slides = [
  {
    id: 1,
    title: "Big sale on all Mobile Accessories",
    description: "Sale!",
    img: "/slider6.jpg",
    url: "/products?category=mobile-accessories",
    bg: "bg-gradient-to-r to-[#4e4e4e] from-white",
  },
  {
    id: 2,
    title: "Gaming Laptops Collections",
    description: "Sale! Up to 50% off!",
    img: "/slider1.jpg",
    url: "/products?category=laptops",
    bg: "bg-gradient-to-r from-white to-[#b18900]",
  },
  {
    id: 3,
    title: "On our watch Collections",
    description: "Sale! Up to 30% off!",
    img: "/slider4.jpg",
    url: "/products?category=smart-watch",
    bg: "bg-gradient-to-r from-blue-50 to-black ",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[calc(100vh-65px)] relative overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}>
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}>
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link
                href={slide.url}
                className={buttonVariants({
                  variant: "default",
                })}>
                Shop
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover xl:object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 lg:ring-ring ring-secondary cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}>
            {current === index && (
              <div className="w-[6px] h-[6px] lg:bg-ring bg-secondary rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slider;
