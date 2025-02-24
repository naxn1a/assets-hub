import prisma from "@/database";
import { hashPassword } from "@/utils/auth/Hash";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
import { UserStatus } from "@prisma/client";

interface UserType {
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  phone: string;
  hiredate: string;
  status: UserStatus;
  department_id: string;
  role_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        department: true,
        role: true,
      },
    });

    if (!user) throw new Error("User not found");

    return SendHandler(user);
  } catch (error) {
    return ErrorHandler(error);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    let temp: UserType = {
      email: body.email,
      firstname: body.firstname,
      lastname: body.lastname,
      phone: body.phone,
      hiredate: body.hiredate,
      status: body.status,
      department_id: body.department,
      role_id: body.role,
    };

    if (body.password) temp.password = await hashPassword(body.password);

    const user = await prisma.user.update({
      where: {
        id: (await params).id,
      },
      data: temp,
    });

    return SendHandler(user);
  } catch (error) {
    return ErrorHandler(error);
  }
}
