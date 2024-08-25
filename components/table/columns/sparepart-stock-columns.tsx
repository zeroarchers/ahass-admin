"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { SparepartWithStock } from "@/types";

export const columns: ColumnDef<SparepartWithStock>[] = [
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
    accessorKey: "kodeSparepart",
    header: "Kode Sparepart",
    cell: ({ row }) => <div>{row.getValue("kodeSparepart")}</div>,
  },
  {
    accessorKey: "namaSparepart",
    header: "Nama Sparepart",
    cell: ({ row }) => <div>{row.getValue("namaSparepart")}</div>,
  },
  {
    accessorKey: "gudang",
    header: "Gudang",
    cell: ({ row }) => <div>{row.getValue("gudang")}</div>,
  },
  {
    accessorKey: "stok",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stok
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-right">{row.getValue("stok")}</div>,
  },
  {
    accessorKey: "hargaLokal",
    header: "Harga Lokal",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("hargaLokal")}</div>
    ),
  },
  {
    accessorKey: "hargaNasional",
    header: "Harga Nasional",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("hargaNasional") || "-"}</div>
    ),
  },
];
