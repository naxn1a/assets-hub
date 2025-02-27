"use client";
import { ColumnDef } from "@tanstack/react-table";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import TextColor from "@/components/table/TextColor";

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => <TableColumnHeader column={column} title="User" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Asset Name" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return <TextColor status={data.status} />;
    },
  },
  {
    accessorKey: "reported_by",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Reported by" />
    ),
  },
  {
    accessorKey: "handled_by",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Handled by" />
    ),
  },
];
