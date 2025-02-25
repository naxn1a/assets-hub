import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
import { AuditLogStatus, AuditLogType } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function GET() {
  const audit = await prisma.auditLog.findMany({
    include: {
      asset: true,
      user: true,
      reported_by: true,
      handled_by: true,
    },
  });

  return SendHandler(audit);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession();

    if (!session) throw new Error("Unauthorized");

    const result = await prisma.$transaction(async (tx) => {
      const reported_by = await tx.user.findUnique({
        where: { email: session?.user?.email ?? undefined },
      });

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
