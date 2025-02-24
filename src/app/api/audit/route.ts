import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
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

    const result = await prisma.$transaction(async (tx) => {
      const handled_by = await tx.user.findUnique({
        where: { email: session?.user?.email ?? undefined },
      });

      if (!handled_by) throw new Error("Handler not found");

      const created = await tx.auditLog.create({
        data: {
          asset_id: body.asset_id,
          user_id: session?.user?.email!,
          reported_by_id: body.reported_by_id,
          handled_by_id: handled_by.id,
          status: body.status,
          type: body.type,
          remark: body.remark,
        },
      });

      if (!created) throw new Error("Failed to create history");

      return created;
    });

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
