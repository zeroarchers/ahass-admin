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
import type { PKBWithRelations } from "@/types";
import { generatePDF } from "@/components/misc/invoice-pkb";
import { getPkbByIdClient } from "@/lib/pkb-getter";
import { Badge } from "@/components/ui/badge";

const getStatusBadgeProps = (status: string) => {
  switch (status.toLowerCase()) {
    case "menunggu":
      return { variant: "destructive" as const, className: "bg-red-500" };
    case "proses":
      return { variant: "default" as const, className: "bg-yellow-500" };
    case "pause":
      return {
        variant: "outline" as const,
        className: "text-red-500 border-red-500",
      };
    case "selesai":
      return { variant: "default" as const, className: "bg-green-500" };
    case "batal":
      return { variant: "default" as const, className: "bg-black" };
    default:
      return { variant: "default" as const, className: "" };
  }
};

export const columns: ColumnDef<PKBWithRelations>[] = [
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
    cell: ({ row }) => {
      const status = row.getValue("status_pkb") as string;
      const { variant, className } = getStatusBadgeProps(status);
      return (
        <div>
          <Badge variant={variant} className={className}>
            {status}
          </Badge>
        </div>
      );
    },
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
    accessorKey: "jasaPKB`",
    header: "Jenis Pekerjaan",
    cell: ({ row }) => {
      const jobTypes = row.original.jasaPKB.map((item) => item.jasa.jobType);
      const mergedJobTypes = jobTypes.join(", ");
      return <div>{mergedJobTypes}</div>;
    },
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
            <DropdownMenuItem
              onClick={async () => {
                const pkbDetail = await getPkbByIdClient(pkb.no_pkb);
                if (pkbDetail != null) generatePDF(pkbDetail);
              }}
              className="bg-blue-400"
            >
              Print
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={pkb.no_pkb} />
            <DeleteButton id={pkb.no_pkb} deleteAction={deletePkb} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
