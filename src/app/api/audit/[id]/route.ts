import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
import { AuditLogStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const audit = await prisma.auditLog.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        asset: true,
        user: true,
        reported_by: true,
        handled_by: true,
      },
    });

    if (!audit) throw new Error("Audit not found");

    return SendHandler(audit);
  } catch (error) {
    return ErrorHandler(error);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const session = await getServerSession();
    let need_handle = false;

    if (
      [
        AuditLogStatus.Approved,
        AuditLogStatus.Rejected,
        AuditLogStatus.Completed,
      ].includes(body.status)
    ) {
      need_handle = true;
    }

    const audit = await prisma.auditLog.update({
      where: {
        id: (await params).id,
      },
      data: {
        status: body.status,
        handled_by_id: need_handle ? session?.user?.email : null,
      },
    });

    if (!audit) throw new Error("Audit not found");

    return SendHandler(audit);
  } catch (error) {
    return ErrorHandler(error);
  }
}
