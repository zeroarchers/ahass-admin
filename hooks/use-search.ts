"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";

export function useSearch(defaultFilterColumn: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterValue, setFilterValue] = useState(
    searchParams.get("filter") || "",
  );
  const [selectedFilterColumn, setSelectedFilterColumn] = useState(
    searchParams.get("filterColumn") || defaultFilterColumn,
  );

  const handleFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filterValue);
    params.set("filterColumn", selectedFilterColumn);
    params.set("page", "1"); // Reset to the first page when filtering

    router.push(`${pathname}?${params.toString()}`);
  }, [filterValue, selectedFilterColumn, router, pathname, searchParams]);

  return {
    filterValue,
    setFilterValue,
    selectedFilterColumn,
    setSelectedFilterColumn,
    handleFilter,
  };
}
