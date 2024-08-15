"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SearchFilter from "./search-field-ssr";
import { usePathname } from "next/navigation";

type StatusButton = {
  label: string;
  action: string;
};

interface DynamicTableProps {
  table: any;
  filterColumns: string[];
  statusButtons?: StatusButton[];
  onStatusChange?: (action: string, selectedIds: string[]) => Promise<void>;
}

export default function TableHeader({
  table,
  filterColumns,
  statusButtons,
  onStatusChange,
}: DynamicTableProps) {
  const path = usePathname();

  const handleStatusChange = async (action: string) => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row: any) => row.original.no_pkb);
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
                .filter((column: any) => column.getCanHide())
                .map((column: any) => (
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
    </>
  );
}
