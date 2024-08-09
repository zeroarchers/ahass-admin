"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { SparepartPKB } from "@prisma/client";
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

export const sparepartColumns: ColumnDef<SparepartPKB>[] = [
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
    accessorKey: "kode_sparepart",
    header: "Kode",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("kode_sparepart")}</div>
    ),
  },
  {
    accessorKey: "nama_sparepart",
    header: "Nama",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nama_sparepart")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "harga_sparepart",
    header: "Harga Sparepart",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("harga_sparepart")}</div>
    ),
  },
  {
    accessorKey: "persentase_diskon",
    header: "Persentase Diskon",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("persentase_diskon")}</div>
    ),
  },
  {
    accessorKey: "tambahan_harga_sparepart",
    header: "Tambahan Harga Sparepart",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("tambahan_harga_sparepart")}
      </div>
    ),
  },
  {
    accessorKey: "total_harga_sparepart",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Total Harga Sparepart
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.original.total_harga_sparepart}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const orirow = row.original;
      table.options.meta;
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
              onClick={() =>
                navigator.clipboard.writeText(orirow.kode_sparepart)
              }
            >
              Copy Kode
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
