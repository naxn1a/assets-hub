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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const asset = await prisma.asset.update({
      where: {
        id: (await params).id,
      },
      data: {
        warranty_expiry: body.warrantyexpiry,
        status: body.status,
      },
    });

    if (!asset) throw new Error("Asset not found");

    return SendHandler(asset);
  } catch (error) {
    return ErrorHandler(error);
  }
}
