import prisma from "@/database";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ status: string }> }
) {
  const status = (await params).status;

  if (!["Available", "Assigned", "UnderRepair"].includes(status)) {
    return Response.json({ message: "Invalid status" }, { status: 400 });
  }

  const assets = await prisma.asset.findMany({
    where: {
      status: status as "Available" | "Assigned" | "UnderRepair",
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (!assets) {
    return Response.json({ message: "No assets found" }, { status: 404 });
  }

  return Response.json(assets);
}
