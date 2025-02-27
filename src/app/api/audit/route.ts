import prisma from "@/database";
import { UserSession } from "@/utils/auth/UserSession";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
import { AuditLogStatus, AuditLogType } from "@prisma/client";

export async function GET() {
  const audit = await prisma.auditLog.findMany({
    include: {
      asset: true,
      user: true,
      reported_by: true,
      handled_by: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return SendHandler(audit);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      const reported_by = await UserSession("Human resource");

      if (!reported_by) throw new Error("Reported not found");

      const created = await tx.auditLog.create({
        data: {
          ...body,
          reported_by_id: reported_by.id,
          status: AuditLogStatus.Pending,
          type: AuditLogType.Assignment,
          remark: "",
        },
      });

      if (!created) throw new Error("Failed to create audit log");

      return created;
    });

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
