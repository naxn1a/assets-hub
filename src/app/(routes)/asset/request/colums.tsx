"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import Link from "next/link";

export const RequestColumns: ColumnDef<any>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => <TableColumnHeader column={column} title="User" />,
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Serial" />
    ),
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
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/asset/${data.id}`}>
          <LucideEdit className="h-4 w-4" />
        </Link>
      );
    },
  },
];
