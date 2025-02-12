import { SendHandler } from "@/utils/ErrorHandler";

export async function POST(req: Request) {
  const token = req.headers.get("authorization");
  console.log(token);
  return Response.json(
    SendHandler({
      message: "Hello World",
    })
  );
}
