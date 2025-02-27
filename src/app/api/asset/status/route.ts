import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.asset.findMany({
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

    if (!result) throw new Error("Assets not found");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
