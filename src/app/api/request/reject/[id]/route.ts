import prisma from "@/database";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const data = await prisma.$transaction(async (tx) => {
      const request = await tx.request.findUnique({
        where: {
          id,
        },
      });

      if (!request) throw new Error("Request not found");

      const updatedRequest = await tx.request.update({
        where: {
          id: request.id,
        },
        data: {
          status: "Rejected",
        },
      });

      if (!updatedRequest) throw new Error("Failed to update request");

      return updatedRequest;
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
