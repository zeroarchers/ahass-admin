"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchFilter from "./search-field-ssr";
import TableTemplate from "./table-template";
import Pagination from "./pagination";

type StatusButton = {
  label: string;
  action: string;
};

interface DynamicTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  currentPage: number;
  pageCount: number;
  filterColumns: string[];
  statusButtons?: StatusButton[];
  onStatusChange?: (action: string, selectedIds: string[]) => Promise<void>;
}

export default function DynamicTable({
  data,
  columns,
  pageCount,
  filterColumns,
  statusButtons,
  onStatusChange,
}: DynamicTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const path = usePathname();

  if (!data || data.length === 0) return <p>Loading...</p>;

  const totalPages = table.getPageCount();

  const handleStatusChange = async (action: string) => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.no_pkb);
    if (onStatusChange) await onStatusChange(action, selectedIds);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex">
          <SearchFilter
            defaultFilterColumn={filterColumns[0]}
            filterColumns={filterColumns}
          />
        </div>
        <div className="flex justify-between lg:justify-end">
          <Link href={`${path}/create`}>
            <Button className="me-5">
              <div className="flex align-center justify-between">
                <p className="leading-relaxed">Create</p>
                <Plus />
              </div>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {statusButtons && statusButtons.length > 0 && (
        <div className="flex justify-between w-full items-center mb-4 space-x-2">
          <div className="flex space-x-2">
            {statusButtons.map((button, index) => {
              if (index <= statusButtons.length / 2) {
                return (
                  <Button
                    key={index}
                    onClick={() => handleStatusChange(button.action)}
                  >
                    {button.label}
                  </Button>
                );
              }
              return null;
            })}
          </div>

          <div className="flex space-x-2">
            {statusButtons.map((button, index) => {
              if (index > statusButtons.length / 2) {
                return (
                  <Button
                    key={index}
                    onClick={() => handleStatusChange(button.action)}
                    className="justify-self-end border-primary"
                    variant="outline"
                  >
                    {button.label}
                  </Button>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <TableTemplate table={table} />
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
