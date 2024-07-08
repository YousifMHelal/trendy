"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Cart from "./Cart";
import MobileNav from "./MobileNav";
import UserNav from "./UserNav";
import WidthContainer from "./WidthContainer";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <WidthContainer>
          <nav className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Left side of navigation */}
              {/* Logo */}
              <div className="ml-4 text-xl font-bold flex lg:ml-0">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.svg" alt="logo" width={23} height={23} />
                  Trendy
                </Link>
              </div>
              {/* Links */}
              <div className="hidden z-50 lg:flex gap-5 items-center lg:ml-8 lg:self-stretch">
                <Link
                  href="/products"
                  className={buttonVariants({
                    variant: "ghost",
                  })}>
                  Shop
                </Link>
                <Link
                  href="/products"
                  className={buttonVariants({
                    variant: "ghost",
                  })}>
                  Deals
                </Link>
              </div>

              {/* Right side of navigation */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}>
                      Sign in
                    </Link>
                  )}

                  {/* Separator */}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}>
                      Create account
                    </Link>
                  )}

                  {/* Separator */}
                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      {/* Separator */}
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                {/* small navigation */}
                <MobileNav user={user} />

                {/* cart */}
                <span
                  className="lg:hidden h-6 w-px bg-gray-200"
                  aria-hidden="true"
                />
                <div className="ml-4 lg:ml-6">
                  <Cart />
                </div>
              </div>
            </div>
          </nav>
        </WidthContainer>
      </header>
    </div>
  );
};

export default Navbar;
