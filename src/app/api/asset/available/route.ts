import prisma from "@/database";

export async function GET() {
  return Response.json(
    await prisma.asset.findMany({
      where: {
        status: "Available",
      },
      orderBy: {
        created_at: "desc",
      },
    })
  );
}
