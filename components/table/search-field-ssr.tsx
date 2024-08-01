"use client";

import { useSearch } from "@/hooks/use-search";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

interface SearchFilterProps {
  defaultFilterColumn: string;
  filterColumns: string[];
}

export default function SearchFilter({
  defaultFilterColumn,
  filterColumns,
}: SearchFilterProps) {
  const {
    filterValue,
    setFilterValue,
    selectedFilterColumn,
    setSelectedFilterColumn,
    handleFilter,
  } = useSearch(defaultFilterColumn);
  return (
    <>
      <Input
        placeholder={`Filter ${selectedFilterColumn ?? ""}...`}
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        className="me-3"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Filter <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filterColumns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column}
              className="capitalize"
              checked={selectedFilterColumn === column}
              onCheckedChange={() => {
                setSelectedFilterColumn(column);
                setFilterValue("");
              }}
            >
              {column}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={handleFilter} className="ms-3">
        Search
      </Button>
    </>
  );
}
