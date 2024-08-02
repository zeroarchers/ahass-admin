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
import { deleteKendaraan } from "@/actions/kendaraan";
import { KendaraanWithDetails } from "@/types";

export const columns: ColumnDef<KendaraanWithDetails>[] = [
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
    accessorKey: "no_polisi",
    header: "No Polisi",
    cell: ({ row }) => <div>{row.getValue("no_polisi")}</div>,
  },
  {
    accessorKey: "no_mesin",
    header: "No Mesin",
    cell: ({ row }) => <div>{row.getValue("no_mesin")}</div>,
  },
  {
    accessorKey: "no_rangka",
    header: "No Rangka",
    cell: ({ row }) => <div>{row.getValue("no_rangka")}</div>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div>
          {(row.getValue("customer") as KendaraanWithDetails["customer"]).nama}
        </div>
      );
    },
  },
  {
    accessorKey: "tipeKendaraan",
    header: "Tipe",
    cell: ({ row }) => {
      return <div>{row.getValue("tipeKendaraan")}</div>;
    },
  },
  {
    accessorKey: "warna",
    header: "Warna",
    cell: ({ row }) => <div>{row.getValue("warna")}</div>,
  },
  {
    accessorKey: "tahun_rakit",
    header: "Tahun Rakit",
    cell: ({ row }) => <div>{row.getValue("tahun_rakit")}</div>,
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
      const kendaraan = row.original;

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
              onClick={() => navigator.clipboard.writeText(kendaraan.no_polisi)}
            >
              Copy No Polisi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditButton id={kendaraan.no_polisi} />
            <DeleteButton
              id={kendaraan.no_polisi}
              deleteAction={deleteKendaraan}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
