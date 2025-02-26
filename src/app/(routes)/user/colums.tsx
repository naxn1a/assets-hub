"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import Link from "next/link";
import { UserStatus } from "@/utils/color/UserColor";

export const UserColumns: ColumnDef<any>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Firstname" />
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lastname" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="Role" />,
  },
  {
    accessorKey: "hiredate",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Hide date" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div
          className={`px-2 py-1 rounded-full w-fit ${UserStatus(data.status)}`}
        >
          {data.status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/user/${data.id}`}>
          <LucideEdit className="h-4 w-4" />
        </Link>
      );
    },
  },
];
