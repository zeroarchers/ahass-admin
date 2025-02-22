"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { BAG } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import EditButton from "../edit-button";

export const columns: ColumnDef<BAG>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "noBag",
    header: "No. BAG",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("noBag")}</div>
    ),
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("tanggal")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "tipeBagIsIncoming",
    header: "Tipe BAG",
    cell: ({ row }) => {
      const value = row.getValue("tipeBagIsIncoming") ? "Masuk" : "Keluar";
      return <div className="capitalize">{value}</div>;
    },
  },
  {
    accessorKey: "gudangId",
    header: "ID Gudang",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gudangId")}</div>
    ),
  },
  {
    accessorKey: "alasan",
    header: "Alasan",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("alasan")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const bag = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(bag.noBag)}
            >
              Copy kode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={bag.noBag.toString()} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
