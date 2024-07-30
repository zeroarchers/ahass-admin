"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Jasa } from "@prisma/client";
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
import EditButton from "../edit-button";
import DeleteButton from "../delete-button";
import { deleteJasa, deleteKaryawan } from "@/actions/actions";

export const columns: ColumnDef<Jasa>[] = [
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
    accessorKey: "kode",
    header: "Kode",
    cell: ({ row }) => <div className="capitalize">{row.getValue("kode")}</div>,
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "jobType",
    header: "Grup",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jobType")}</div>
    ),
  },
  {
    accessorKey: "hargaJual",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Harga Jual
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("hargaJual")}</div>
    ),
  },
  {
    accessorKey: "waktuKerja",
    header: "Waktu Kerja",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("waktuKerja")}</div>
    ),
  },
  {
    accessorKey: "statusAktif",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("statusAktif") ? "active" : "inactive";
      return <div className="capitalize">{value}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
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
              onClick={() => navigator.clipboard.writeText(jasa.kode)}
            >
              Copy kode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={jasa.kode.toString()} />
            <DeleteButton id={jasa.kode} deleteAction={deleteJasa} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
