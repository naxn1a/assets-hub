import { AuditLogStatus } from "@prisma/client";

export const AuditStatusColor = (status: string) => {
  switch (status) {
    case AuditLogStatus.Pending:
      return "bg-yellow-100 text-yellow-700";
    case AuditLogStatus.Approved:
      return "bg-green-100 text-green-700";
    case AuditLogStatus.Rejected:
      return "bg-red-100 text-red-700";
    case AuditLogStatus.Completed:
      return "bg-green-100 text-green-700";
    case AuditLogStatus.Cancelled:
      return "bg-red-100 text-red-700";
  }
};
