"use client";

import React from "react";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="p-5 rounded-lg flex max-h-20 items-center justify-between bg-input">
      <div className="font-bold capitalize">{pathName.split("/").pop()}</div>
      <div className="flex items-center gap-5">
        <Input type="text" placeholder="search..." className="w-72" />
        <div className="flex gap-3 pointer">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
