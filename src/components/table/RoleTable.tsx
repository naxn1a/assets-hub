"use client";
import { useMyContext } from "@/context/AuthContext";

interface RoleTableProps {
  children: React.ReactNode;
  role: string;
}

export default function RoleTable({ children, role }: RoleTableProps) {
  const { user } = useMyContext();

  if (!["Admin", role].includes(user.role)) return null;

  return <section>{children}</section>;
}
