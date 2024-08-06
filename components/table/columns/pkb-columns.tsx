"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { PKB } from "@prisma/client";
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

export const columns: ColumnDef<PKB>[] = [
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
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "noPKB",
    header: "noPKB",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("noPKB")}</div>
    ),
  },
  {
    accessorKey: "noPolisi",
    header: "noPolisi",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("noPolisi")}</div>
    ),
  },
  {
    accessorKey: "soNo",
    header: "No. Bayar",
    cell: ({ row }) => <div className="capitalize">{row.getValue("soNo")}</div>,
  },
  {
    accessorKey: "totalFaktur",
    header: "Total Faktur",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalFaktur")}</div>
    ),
  },
  {
    accessorKey: "tipePembayran",
    header: "Tipe Pembayaran",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tipePembayran")}</div>
    ),
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal Bayar",
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("tanggal") as Date).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "soID",
    header: "Invoice ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Invoice ID")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pkb = row.original;
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
              onClick={() => navigator.clipboard.writeText(pkb.id.toString())}
            >
              Copy PKB ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={pkb.id.toString()} />
            <DropdownMenuItem className="bg-blue-400">Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
