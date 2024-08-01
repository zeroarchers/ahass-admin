"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Customer } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {  DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import EditButton from "../edit-button";
import DeleteButton from "../delete-button";
import { deleteCustomer } from "@/actions/customer";

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "alamat",
    header: "Alamat",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("alamat")}</div>
    ),
  },
  {
    accessorKey: "kota",
    header: "Kota",
    cell: ({ row }) => <div className="capitalize">{row.getValue("kota")}</div>,
  },
  {
    accessorKey: "notelp",
    header: "No. Telp",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("notelp")}</div>
    ),
  },
  {
    accessorKey: "nohp",
    header: "No. HP",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nohp")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status Aktif",
    cell: ({ row }) => (
      <div className="capitalize">{(row.getValue("status") as boolean) ? "Aktif" : "Tidak aktif"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const orirow = row.original;

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
              onClick={() => navigator.clipboard.writeText(orirow.kode)}
            >
              Copy Kode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={orirow.kode.toString()} />
            <DeleteButton id={orirow.kode} deleteAction={deleteCustomer} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
