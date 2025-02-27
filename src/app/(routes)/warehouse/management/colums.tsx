"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleApprove, handleReject } from "./_actions";
import TextColor from "@/components/table/TextColor";

export const ManagementColumns: ColumnDef<any>[] = [
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
      return <TextColor status={data.status} />;
    },
  },
  {
    accessorKey: "reported_by",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Reported By" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <LucideEdit className="h-4 w-4" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Do you want to approve it?</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <DialogFooter>
              <Button onClick={() => handleApprove(data.id)} variant="default">
                Yes
              </Button>
              <Button onClick={() => handleReject(data.id)} variant="secondary">
                No
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
