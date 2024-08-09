"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { JasaPKB } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export const jasaColumns: ColumnDef<JasaPKB>[] = [
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
    accessorKey: "kode_jasa",
    header: "Kode",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("kode_jasa")}</div>
    ),
  },
  {
    accessorKey: "nama_jasa",
    header: "Nama",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nama_jasa")}</div>
    ),
  },
  {
    accessorKey: "harga_jasa",
    header: "Harga Jasa",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("harga_jasa")}</div>
    ),
  },
  {
    accessorKey: "tambahan_harga_jasa",
    header: "Tambahan Harga Jasa",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tambahan_harga_jasa")}</div>
    ),
  },
  {
    accessorKey: "total_harga_jasa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Total Harga Jasa
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("total_harga_jasa")}</div>
    ),
  },
  {
    accessorKey: "persentase_diskon",
    header: "Persentase Diskon",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("persentase_diskon")}%</div>
    ),
  },
  {
    accessorKey: "opl",
    header: "OPL",
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("opl") as boolean).toString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const jasa = row.original;

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
              onClick={() => navigator.clipboard.writeText(jasa.kode_jasa)}
            >
              Copy kode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              // @ts-ignore
              onClick={() => table.options.meta?.deleteRow(row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
