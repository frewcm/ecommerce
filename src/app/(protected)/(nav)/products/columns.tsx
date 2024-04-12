"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export type ProductType = {
  _id: string;
  product_name: string;
  description: string;
  catagory: {
    catagory_name: string;
  };
  price: number;
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "description", header: "Description" },
  {
    accessorFn: (row) => row.catagory?.catagory_name || "",
    header: "Catagory",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.product_name)
              }
            >
              Copy product name
            </DropdownMenuItem>

            <Link
              href={{
                pathname: `/products/edit/${product._id}`,
                query: {
                  _id: product._id,
                  product_name: product.product_name,
                  description: product.description,
                  catagory: product.catagory?.catagory_name,
                  price: product.price,
                },
              }}
            >
              <DropdownMenuItem>Edit product</DropdownMenuItem>
            </Link>
            <Link
              href={{
                pathname: `/products/delete/${product._id}`,
                query: {
                  _id: product._id,
                  product_name: product.product_name,
                  description: product.description,
                  catagory: product.catagory?.catagory_name,
                  price: product.price,
                },
              }}
            >
              <DropdownMenuItem>Delete product</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
