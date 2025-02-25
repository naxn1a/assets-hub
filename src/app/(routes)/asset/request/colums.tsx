"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleCancel } from "./_actions";
import { AuditLogStatus } from "@prisma/client";
import { AuditStatusColor } from "@/utils/AuditStatusColor";

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
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div
          className={`px-2 py-1 rounded-full w-fit ${AuditStatusColor(
            data.status
          )}`}
        >
          {data.status}
        </div>
      );
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
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return data.status === AuditLogStatus.Pending ? (
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <LucideEdit className="h-4 w-4" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Do you want to cancel it?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => handleCancel(data.id)} variant="default">
                Yes
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">No</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null;
    },
  },
];
