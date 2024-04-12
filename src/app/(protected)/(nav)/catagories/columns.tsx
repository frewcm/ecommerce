"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CatagoryType {
  _id: string;
  catagory_name: string;
  parentCatagory: { catagory_name: string };
}

export const columns: ColumnDef<CatagoryType>[] = [
  {
    accessorKey: "catagory_name",
    header: "Catagory name",
  },
  {
    accessorFn: (row) => row.parentCatagory?.catagory_name || "",
    header: "Parent catagory",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const catagory = row?.original;

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
                navigator.clipboard.writeText(catagory.catagory_name)
              }
            >
              Copy catagory name
            </DropdownMenuItem>
            <Link
              href={{
                pathname: `/catagories/edit/${catagory._id}`,
                query: {
                  _id: catagory._id,
                  catagory_name: catagory.catagory_name,
                  parentCatagory: catagory?.parentCatagory?.catagory_name,
                },
              }}
            >
              <DropdownMenuItem>Edit catagory</DropdownMenuItem>
            </Link>
            <Link
              href={{
                pathname: `/catagories/delete/${catagory._id}`,
                query: {
                  _id: catagory._id,
                  catagory_name: catagory.catagory_name,
                },
              }}
            >
              <DropdownMenuItem>Delete catagory</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
