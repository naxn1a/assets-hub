import prisma from "@/database";
import { UserSession } from "@/utils/auth/UserSession";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
import { AuditLogStatus } from "@prisma/client";

export async function GET() {
  const result = await prisma.auditLog.findMany({
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

  return SendHandler(result);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await UserSession();
    if (!user) throw new Error("Unauthorized");

    const result = await prisma.auditLog.create({
      data: {
        asset_id: body.asset_id,
        type: body.type,
        status: AuditLogStatus.Pending,
        remark: body.remark,
        user_id: body.user_id,
        reported_by_id: user.id || null,
        handled_by_id: body.handled_by_id || null,
      },
    });

    if (!result) throw new Error("Failed to create audit log");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
