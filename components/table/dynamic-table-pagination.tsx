"use client";

import * as React from "react";
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
import TableTemplate from "./table-template";
import Pagination from "./pagination";
import TableHeader from "./table-header";

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

  const totalPages = table.getPageCount();

  return (
    <>
      <TableHeader
        filterColumns={filterColumns}
        table={table}
        onStatusChange={onStatusChange}
        statusButtons={statusButtons}
      />
      <div className="rounded-md border">
        <TableTemplate table={table} />
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
