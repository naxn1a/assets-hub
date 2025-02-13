import prisma from "@/database";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await prisma.asset.findUnique({
    where: {
      id: (await params).id,
    },
  });
  return Response.json(data);
}
