import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearch(defaultFilterColumn: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterValue, setFilterValue] = useState("");
  const [selectedFilterColumn, setSelectedFilterColumn] =
    useState(defaultFilterColumn);

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handleFilter = useCallback(
    (startDate?: string, endDate?: string) => {
      const queryString = createQueryString({
        filterColumn: selectedFilterColumn,
        filter: filterValue,
        startDate,
        endDate,
      });

      router.push(`${pathname}?${queryString}`);
    },
    [router, pathname, createQueryString, selectedFilterColumn, filterValue],
  );

  return {
    filterValue,
    setFilterValue,
    selectedFilterColumn,
    setSelectedFilterColumn,
    handleFilter,
  };
}
