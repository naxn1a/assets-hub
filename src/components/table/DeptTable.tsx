"use client";
import { useMyContext } from "@/context/AuthContext";

interface RoleTableProps {
  children: React.ReactNode;
  dept: string[];
}

export default function DeptTable({ children, dept }: RoleTableProps) {
  const { user } = useMyContext();

  if (!["Admin", ...dept].includes(user.dept)) return null;

  return <section>{children}</section>;
}
