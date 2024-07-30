"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Karyawan } from "@prisma/client";
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
import DeleteButton from "../delete-button";
import { deleteKaryawan } from "@/actions/actions";

export const columns: ColumnDef<Karyawan>[] = [
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
    cell: ({ row }) => {
      const karyawan = row.original;

      return <div>K{karyawan.id.toString().padStart(4, "0")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
    cell: ({ row }) => <div>{row.getValue("alamat")}</div>,
  },
  {
    accessorKey: "kabupaten",
    header: "Kota",
    cell: ({ row }) => <div>{row.getValue("kabupaten")}</div>,
  },
  {
    accessorKey: "nohp",
    header: "No HP",
    cell: ({ row }) => <div>{row.getValue("nohp")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const karyawan = row.original;

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
                navigator.clipboard.writeText(karyawan.id.toString())
              }
            >
              Copy kode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={karyawan.id.toString()} />
            <DeleteButton
              id={karyawan.id.toString()}
              deleteAction={deleteKaryawan}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
