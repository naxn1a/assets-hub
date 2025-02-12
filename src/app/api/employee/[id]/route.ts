import prisma from "@/database";
import { hashPassword } from "@/utils/auth/Hash";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    let data: any = {
      username: body.username,
      email: body.email,
      first_name: body.firstname,
      last_name: body.lastname,
      phone: body.phone,
      hire_date: body.hiredate,
      status: body.status,
      department_id: parseInt(body.department),
      role_id: parseInt(body.role),
    };

    if (body.password) data.password = await hashPassword(body.password);

    await prisma.employee.update({
      where: {
        id: (await params).id,
      },
      data,
    });

    return Response.json(
      SendHandler({
        message: "Employee updated",
      })
    );
  } catch (error) {
    return Response.json(ErrorHandler(error));
  }
}
