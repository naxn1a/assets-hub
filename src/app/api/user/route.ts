import prisma from "@/database";
import { hashPassword } from "@/utils/auth/Hash";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const user = await prisma.user.findMany({
    include: {
      department: true,
      role: true,
    },
    omit: {
      password: true,
    },
  });

  return SendHandler(user);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const already = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (already) throw new Error("Email already exists");

    const password = `${body.firstname}.${body.lastname.slice(0, 2)}`;

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await hashPassword(password),
        firstname: body.firstname,
        lastname: body.lastname,
        phone: body.phone,
        hiredate: new Date(body.hiredate),
        status: body.status,
        department_id: body.department,
        role_id: body.role,
      },
    });

    return SendHandler(user);
  } catch (error) {
    return ErrorHandler(error);
  }
}
