"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { deletePkb } from "@/actions/pkb";
import { PKB } from "@prisma/client";
import Link from "next/link";
import { generatePDF } from "@/components/misc/invoice-pkb";

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
    accessorKey: "status_pkb",
    header: "Status PKB",
    cell: ({ row }) => <div>{row.getValue("status_pkb")}</div>,
  },
  {
    accessorKey: "mekanik",
    header: "Nama Mekanik",
    cell: ({ row }) => <div>{row.getValue("mekanik")}</div>,
  },
  {
    accessorKey: "pemilik",
    header: "Nama Pemilik",
    cell: ({ row }) => <div>{row.getValue("pemilik")}</div>,
  },
  {
    accessorKey: "no_antrian",
    header: "No Antrian",
    cell: ({ row }) => <div>{row.getValue("no_antrian")}</div>,
  },
  {
    accessorKey: "no_pkb",
    header: "No PKB",
    cell: ({ row }) => <div>{row.getValue("no_pkb")}</div>,
  },
  {
    accessorKey: "no_polisi",
    header: "No Polisi",
    cell: ({ row }) => <div>{row.getValue("no_polisi")}</div>,
  },
  {
    accessorKey: "no_mesin",
    header: "Engine No",
    cell: ({ row }) => <div>{row.getValue("no_mesin")}</div>,
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("tanggal")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "activity_capacity",
    header: "Jenis Pekerjaan",
    cell: ({ row }) => <div>{row.getValue("activity_capacity")}</div>,
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
              onClick={() => navigator.clipboard.writeText(pkb.no_pkb)}
            >
              Copy No PKB
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={pkb.no_pkb} />
            <DeleteButton id={pkb.no_pkb} deleteAction={deletePkb} />
            <DropdownMenuItem
              onClick={async () => {
                const response = await fetch(`/api/pkb?no_pkb=${pkb.no_pkb}`);
                const pkbData = await response.json();
                console.log(pkbData);
                generatePDF(pkbData);
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
