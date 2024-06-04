"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserNav from "./UserNav";
import { buttonVariants } from "./ui/button";


const MobileNav = ({user} : any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "mr-2 lg:hidden"
        )}>
        {isOpen ? (
          <X
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <Menu
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute top-[60px] inset-x-0 flex-col flex align-center justify-center gap-8 text-xl w-full h-[calc(100vh-60px)] text-primary-foreground bg-foreground z-50">
          <Link
            href="/products"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "lg",
              }),
              "w-max mx-auto text-lg"
            )}>
            Shop
          </Link>
          <Link
            href="/deals"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "lg",
              }),
              "w-max mx-auto text-lg"
            )}>
            Deals
          </Link>

          <span
            className="h-px w-[90%] mx-auto bg-gray-200"
            aria-hidden="true"
          />

          {user ? null : (
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                }),
                "w-max mx-auto"
              )}>
              Sign in
            </Link>
          )}

          {user ? (
            <UserNav user= {user} />
          ) : (
            <Link
              href="/sign-up"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                }),
                "w-max mx-auto"
              )}>
              Create account
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNav;
