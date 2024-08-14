import React from "react";
import DynamicTable from "./dynamic-table-pagination";

type StatusButton = {
  label: string;
  action: string;
};

interface TableContentProps {
  data: any[];
  columns: any[];
  currentPage: number;
  pageCount: number;
  filterColumns: string[];
  statusButtons?: StatusButton[];
  onStatusChange?: (action: string, selectedIds: string[]) => Promise<void>;
}

const TableContent: React.FC<TableContentProps> = ({
  data,
  columns,
  currentPage,
  pageCount,
  filterColumns,
  statusButtons,
  onStatusChange,
}) => {
  return (
    <DynamicTable
      data={data}
      columns={columns}
      currentPage={currentPage}
      pageCount={pageCount}
      filterColumns={filterColumns}
      statusButtons={statusButtons}
      onStatusChange={onStatusChange}
    />
  );
};

export default TableContent;
