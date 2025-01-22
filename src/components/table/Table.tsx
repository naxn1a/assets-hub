"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { useState } from "react";
import TablePagination from "./TablePagination";
import TableData from "./TableData";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import TableViewOptions from "./TableViewOptions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: string;
  option?: {
    search: string;
    filters: any[];
  };
  children?: React.ReactNode;
}

export default function <TData, TValue>({
  columns,
  data,
  search,
  option,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <section>
      {children}
      <TableData table={table} columns={columns}>
        <div className="flex items-center py-4 gap-4">
          {search && <TableSearch table={table} search={search} />}
          {option?.filters && (
            <TableFilter table={table} option={option.filters} />
          )}
          <TableViewOptions table={table} />
        </div>
      </TableData>
      <TablePagination table={table} />
    </section>
  );
}
