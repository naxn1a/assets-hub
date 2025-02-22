import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const asset = await prisma.asset.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        user: true,
      },
    });

    if (!asset) throw new Error("Asset not found");

    return SendHandler(asset);
  } catch (error) {
    return ErrorHandler(error);
  }
}
