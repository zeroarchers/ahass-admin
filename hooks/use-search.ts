import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function useSearch(defaultFilterColumn: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterValue, setFilterValue] = useState("");
  const [selectedFilterColumn, setSelectedFilterColumn] =
    useState(defaultFilterColumn);
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });
      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handleFilter = useDebouncedCallback(
    ({
      filterValue = "",
      selectedFilterColumn = "",
      startDate,
      endDate,
    }: {
      filterValue?: string;
      selectedFilterColumn?: string;
      startDate?: string;
      endDate?: string;
    }) => {
      const queryString = createQueryString({
        filterColumn: selectedFilterColumn,
        filter: filterValue,
        startDate: startDate || undefined, // Set to undefined if not provided
        endDate: endDate || undefined, // Set to undefined if not provided
      });
      router.push(`${pathname}?${queryString}`);
    },
    500,
  );

  useEffect(() => {
    handleFilter({
      filterValue,
      selectedFilterColumn,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
  }, [filterValue, selectedFilterColumn, dateRange, handleFilter]);

  const handleDateChange = (startDate?: string, endDate?: string) => {
    setDateRange({ startDate, endDate });
  };

  return {
    filterValue,
    setFilterValue,
    selectedFilterColumn,
    setSelectedFilterColumn,
    handleDateChange,
    handleFilter,
  };
}
