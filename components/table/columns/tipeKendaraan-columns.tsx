"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { TipeKendaraanWithAHM } from "@/types";
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

export const columns: ColumnDef<TipeKendaraanWithAHM>[] = [
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
    accessorKey: "tipe",
    header: "Tipe",
    cell: ({ row }) => <div className="capitalize">{row.getValue("tipe")}</div>,
  },
  {
    accessorKey: "namaTipe",
    header: "Nama Tipe",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("namaTipe")}</div>
    ),
  },
  {
    accessorKey: "cc",
    header: "CC Mesin",
    cell: ({ row }) => <div className="capitalize">{row.getValue("cc")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("model")}</div>
    ),
  },
  {
    accessorKey: "TipeKendaraanAHM",
    header: "Kode",
    cell: ({ row }) => (
      <div className="capitalize">
        {
          (
            row.getValue(
              "TipeKendaraanAHM",
            ) as TipeKendaraanWithAHM["TipeKendaraanAHM"]
          ).kodeTipeKendaraanAHM
        }
      </div>
    ),
  },
  {
    accessorKey: "aktif",
    header: "Aktif",
    cell: ({ row }) => {
      const value = row.getValue("aktif") ? "active" : "inactive";
      return <div className="capitalize">{value}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const TipeKendaraan = row.original;

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
                navigator.clipboard.writeText(TipeKendaraan.id.toString())
              }
            >
              Copy kode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={TipeKendaraan.id.toString()} />
            <DropdownMenuItem className="bg-red-400">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
