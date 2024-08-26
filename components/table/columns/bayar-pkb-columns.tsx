"use client";

import { Button } from "@/components/ui/button";
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
import { generatePDF } from "@/components/misc/invoice-bayar-pkb";
import BayarButton from "../bayar-button";
import { getPkbByIdClient } from "@/lib/pkb-getter";
import { Badge } from "@/components/ui/badge";
import { deletePkb } from "@/actions/pkb";
import DeleteButton from "../delete-button";

export const columns: ColumnDef<PKBWithRelations>[] = [
  {
    accessorKey: "status_pkb",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <Badge className="bg-green-800">{row.getValue("status_pkb")}</Badge>
      </div>
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
    accessorKey: "tanggal_bayar",
    header: "Tanggal Bayar",
    cell: ({ row }) => {
      const preDate = row.getValue("tanggal_bayar");

      const formattedDate = preDate
        ? new Date(preDate as string | number | Date).toLocaleString()
        : "Belum Bayar";

      if (formattedDate === "Belum Bayar") {
        return <Badge>{formattedDate}</Badge>;
      }
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pkb = row.original;
      const id = pkb.no_pkb.toString();
      const terbayar = pkb.no_bayar !== null;
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy PKB ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const pkbDetail = await getPkbByIdClient(id);
                if (pkbDetail != null) generatePDF(pkbDetail);
              }}
              className="bg-blue-400"
              disabled={pkb.tanggal_bayar === null}
            >
              Print
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <BayarButton id={id} terbayar={terbayar} />
            <DeleteButton id={pkb.no_pkb} deleteAction={deletePkb} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
