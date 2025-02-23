"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import Link from "next/link";

export const InventoryColumns: ColumnDef<any>[] = [
  {
    accessorKey: "lot",
    header: ({ column }) => <TableColumnHeader column={column} title="Lot" />,
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Serial" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "purchasedate",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Purchase Date" />
    ),
  },
  {
    accessorKey: "warrantyexpiry",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Warranty Expiry" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "user",
    header: ({ column }) => <TableColumnHeader column={column} title="User" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/asset/inventory/${data.id}`}>
          <LucideEdit className="h-4 w-4" />
        </Link>
      );
    },
  },
];
