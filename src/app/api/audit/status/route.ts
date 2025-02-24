import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const audit = await prisma.auditLog.findMany({
      where: {
        OR: [
          {
            status: {
              in: body.status,
            },
          },
        ],
      },
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

    if (!audit) throw new Error("Audit not found");

    return SendHandler(audit);
  } catch (error) {
    return ErrorHandler(error);
  }
}
