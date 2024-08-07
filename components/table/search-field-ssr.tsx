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
import { ChevronDownIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const [date, setDate] = useState<DateRange | undefined>();

  const handleSearch = () => {
    const startDate = date?.from ? format(date.from, "yyyy-MM-dd") : undefined;
    const endDate = date?.to ? format(date.to, "yyyy-MM-dd") : undefined;
    handleFilter(startDate, endDate);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder={`Filter ${selectedFilterColumn ?? ""}...`}
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        className="w-[200px]"
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleSearch} type="submit">
        Search
      </Button>
    </div>
  );
}
