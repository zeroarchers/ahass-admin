"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { PKBWithRelations } from "@/types";
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
import { generatePDF } from "@/components/misc/invoice-pkb";
import { deletePkb } from "@/actions/pkb";
import DeleteButton from "../delete-button";

export const columns: ColumnDef<PKBWithRelations>[] = [
  {
    accessorKey: "status_pkb",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status_pkb")}</div>
    ),
  },
  {
    accessorKey: "no_pkb",
    header: "No PKB",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_pkb")}</div>
    ),
  },
  {
    accessorKey: "no_polisi",
    header: "No Polisi",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_polisi")}</div>
    ),
  },
  {
    accessorKey: "no_bayar",
    header: "No Bayar",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_bayar")}</div>
    ),
  },
  {
    accessorKey: "uang_bayar",
    header: "Total Faktur",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("uang_bayar")}</div>
    ),
  },
  {
    accessorKey: "tipe_pembayaran",
    header: "Tipe Pembayaran",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tipe_pembayaran")}</div>
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
    accessorKey: "no_pkb",
    header: "Invoice",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_pkb")}</div>
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
            <DropdownMenuItem
              onClick={async () => {
                console.log(pkb);
                generatePDF(pkb);
              }}
              className="bg-blue-400"
            >
              Print
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
