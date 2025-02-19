import prisma from "@/database";

export async function GET() {
  return Response.json(
    await prisma.request.findMany({
      include: {
        asset: true,
        employee: true,
        requester: true,
        approved: true,
      },
    })
  );
}
