import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET(req: Request) {
  try {
    const body = await req.json();

    const assets = await prisma.asset.findMany({
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
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!assets) throw new Error("Assets not found");

    return SendHandler(assets);
  } catch (error) {
    return ErrorHandler(error);
  }
}
