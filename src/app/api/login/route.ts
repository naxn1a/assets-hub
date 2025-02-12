import prisma from "@/database";
import { verifyPassword } from "@/utils/auth/Hash";
import { generateToken } from "@/utils/auth/Jwt";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.employee.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("Invalid email");

    const verify = await verifyPassword(password, user.password);

    if (!verify) throw new Error("Invalid password");

    const token = generateToken({
      id: user.id,
    });

    return Response.json(
      SendHandler({
        message: "Login success",
        token,
      })
    );
  } catch (error) {
    return Response.json(ErrorHandler(error));
  }
}
