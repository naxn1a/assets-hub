import prisma from "@/database";
import { getServerSession } from "next-auth";

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

export async function POST(req: Request) {
  const data = await req.json();
  const session = await getServerSession();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const requester = await tx.employee.findUnique({
        where: { email: session?.user?.email ?? undefined },
      });

      if (!requester) throw new Error("Requester not found");

      const request = await tx.request.create({
        data: {
          employee_id: data.employee,
          asset_id: data.asset,
          request_from: requester.id,
          status: "Pending",
          type: "Withdrawal",
        },
      });

      if (!request) throw new Error("Request not created");

      return request;
    });

    return Response.json({ message: "Success", request: result });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
