import prisma from "@/database";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const employee = await prisma.employee.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      department: true,
      role: true,
    },
  });
  return Response.json(employee);
}
