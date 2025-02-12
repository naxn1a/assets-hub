import prisma from "@/database";
import { hashPassword } from "@/utils/auth/Hash";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const already = await prisma.employee.findFirst({
      where: {
        OR: [
          {
            username: body.username,
          },
          {
            email: body.email,
          },
        ],
      },
    });

    if (already) throw new Error("Employee already exists");

    const password = `${body.firstname}.${body.lastname.slice(0, 2)}`;

    await prisma.employee.create({
      data: {
        username: body.username,
        email: body.email,
        password: await hashPassword(password),
        first_name: body.firstname,
        last_name: body.lastname,
        phone: body.phone,
        hire_date: body.hiredate,
        status: body.status,
        department_id: parseInt(body.department),
        role_id: parseInt(body.role),
      },
    });

    return Response.json(
      SendHandler({
        message: "Employee created",
      })
    );
  } catch (error) {
    return Response.json(ErrorHandler(error));
  }
}
