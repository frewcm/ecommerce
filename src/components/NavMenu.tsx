"use client";
import Link from "next/link";

import { IoStorefront, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { IoMdList } from "react-icons/io";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavMenu() {
  const pathname = usePathname();
  const activeLink = "bg-black text-secondary";

  return (
    <aside className="w-56 h-dvh bg-dominant sticky left-0 top-0 z-50">
      <a
        className="px-6 h-16 flex items-center bg-dominant/95 space-x-2 text-recessive font-inter-ui-bold"
        href="/dashboard"
      >
        <IoStorefront />
        <span>Shop admin</span>
      </a>
      <nav className="text-recessive/70 text-sm font-inter-ui-regular bg-dominant">
        <Link
          className={`${
            pathname === "/dashboard" && activeLink
          } px-6 group flex items-center space-x-2 py-3 hover:bg-black ease-in-out`}
          href={"/dashboard"}
        >
          <AiOutlineDashboard
            className=" group-hover:text-recessive ease-in-out"
            size={20}
          />
          <span>Dashboard</span>
        </Link>
        <Link
          className={`${
            pathname === "/products" && activeLink
          } px-6 group flex items-center space-x-2 py-3 hover:bg-black ease-in-out`}
          href={"/products"}
        >
          <LuShoppingBag
            className="group-hover:text-recessive ease-in-out"
            size={20}
          />
          <span>Products</span>
        </Link>
        <Link
          className={`${
            pathname === "/catagories" && activeLink
          } px-6 group flex items-center space-x-2 py-3 hover:bg-black ease-in-out`}
          href={"/catagories"}
        >
          <LiaLayerGroupSolid
            className="group-hover:text-recessive ease-in-out"
            size={20}
          />
          <span>Catagories</span>
        </Link>
        <Link
          className={`${
            pathname === "/orders" && activeLink
          } px-6 group flex items-center space-x-2 py-3 hover:bg-black ease-in-out`}
          href={"/orders"}
        >
          <IoMdList
            className="group-hover:text-recessive ease-in-out"
            size={20}
          />
          <span>Orders</span>
        </Link>
        <Link
          className={`${
            pathname === "/setting" && activeLink
          } px-6 group flex items-center space-x-2 py-3 hover:bg-black ease-in-out`}
          href={"/setting"}
        >
          <IoSettingsOutline
            className="group-hover:text-recessive ease-in-out"
            size={20}
          />
          <span>Setting</span>
        </Link>
        <button
          onClick={() => signOut()}
          className="px-6 group flex items-center space-x-2 py-3 hover:bg-black ease-in-out"
        >
          <FiLogOut
            className="group-hover:text-recessive ease-in-out"
            size={20}
          />{" "}
          <span>Log out</span>
        </button>
      </nav>
    </aside>
  );
}
