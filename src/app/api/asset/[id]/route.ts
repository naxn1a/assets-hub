import prisma from "@/database";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const device = await prisma.device.findUnique({
    where: {
      id: (await params).id,
    },
  });
  return Response.json(device);
}
