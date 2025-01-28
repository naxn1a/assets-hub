import prisma from "@/database";

export async function GET() {
  return Response.json(
    await prisma.employee.findMany({
      include: {
        department: true,
        role: true,
      },
      omit: {
        password: true,
      },
    })
  );
}
