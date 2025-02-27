import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.auditLog.findMany({
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

    if (!result) throw new Error("Audit not found");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
