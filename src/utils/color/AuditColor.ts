import { AuditLogStatus as s } from "@prisma/client";

export const AuditLogStatus = (status: string) => {
  let color = "";
  switch (status) {
    case s.Pending:
      color = "bg-yellow-100 text-yellow-700";
      break;
    case s.Approved:
      color = "bg-green-100 text-green-700";
      break;
    case s.Rejected:
      color = "bg-red-100 text-red-700";
      break;
    case s.Completed:
      color = "bg-green-100 text-green-700";
      break;
    case s.Cancelled:
      color = "bg-red-100 text-red-700";
      break;
    default:
      color = "bg-gray-100 text-gray-700";
      break;
  }
  return color;
};
