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

      const approve = await tx.auditLog.update({
        where: {
          id: (await params).id,
        },
        data: {
          status: "Approved",
          handled_by_id: handled_by.id,
        },
      });

      if (!approve) throw new Error("Failed to approve asset");

      const asset = await tx.asset.update({
        where: {
          id: approve.asset_id,
        },
        data: {
          status: "Assigned",
          user_id: approve.user_id,
        },
      });

      if (!asset) throw new Error("Failed to update asset");

      return { approve, asset };
    });

    if (!result) throw new Error("Failed to approve asset");

    return SendHandler({ message: "Asset approved" });
  } catch (error) {
    return ErrorHandler(error);
  }
}
