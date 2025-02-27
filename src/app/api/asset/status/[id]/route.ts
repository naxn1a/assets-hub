import prisma from "@/database";
import { UserSession } from "@/utils/auth/UserSession";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const user = await UserSession();
    if (!user) throw new Error("Unauthorized");

    const result = await prisma.asset.update({
      where: {
        id: (await params).id,
      },
      data: {
        status: body.status,
        user_id: body.user_id,
      },
    });

    if (!result) throw new Error("Failed to update audit log");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
