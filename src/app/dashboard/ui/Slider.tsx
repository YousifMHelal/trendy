"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidCartAdd, BiSolidCategoryAlt } from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiApps2AddFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";

const links = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
  },
  {
    name: "Products",
    icon: BiSolidCartAdd,
    href: "/dashboard/products",
  },
  {
    name: "Add Products",
    icon: HiViewGridAdd,
    href: "/dashboard/add-new-product",
  },
  {
    name: "categories",
    icon: BiSolidCategoryAlt,
    href: "/dashboard/categories",
  },
  {
    name: "Add category",
    icon: RiApps2AddFill,
    href: "/dashboard/add-new-category",
  },
  {
    name: "Logout",
    icon: IoLogOut,
    href: "/",
  },
];

const Slider = () => {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <section className="w-72 sticky left-0 top-0 flex flex-col bg-input gap-2">
      <nav className="w-72 sticky left-0 top-0 flex flex-col bg-input gap-2">
        {/* Admin information */}
        <div className="px-6 flex items-center gap-4 mb-2 py-6">
          <RxAvatar className="text-4xl" />
          <div>
            <h2 className="font-semibold capitalize">{data?.user?.name}</h2>
            <p>Administrator</p>
          </div>
        </div>
        {/* Links */}
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={cn("flex gap-3 items-center py-4 max-lg:px-4 pl-6", {
                "bg-gradient-to-l from-muted-foreground to-secondary border-r-4 border-primary":
                  isActive,
              })}>
              <link.icon className="w-6 h-6" />
              <p>{link.name}</p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Slider;
