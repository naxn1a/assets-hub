import prisma from "@/database";
import { UserSession } from "@/utils/auth/UserSession";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const handled_by = await UserSession("Information Technology");

      if (!handled_by) throw new Error("Failed to get user");

      const reject = await prisma.auditLog.update({
        where: {
          id: (await params).id,
        },
        data: {
          status: "Rejected",
          handled_by_id: handled_by.id,
        },
      });

      if (!reject) throw new Error("Failed to reject asset");

      return reject;
    });

    if (!result) throw new Error("Failed to reject asset");

    return SendHandler({ message: "Asset rejected" });
  } catch (error) {
    return ErrorHandler(error);
  }
}
