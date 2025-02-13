"use server";
import { cookies } from "next/headers";
import { ErrorHandler } from "./ErrorHandler";

interface FetchDataProps {
  path: string;
  body?: any;
  auth?: boolean;
}

export const fetchData = async ({
  path,
  body,
  auth = false,
}: FetchDataProps) => {
  try {
    const cookieStore = await cookies();

    const data = fetch(`${process.env.API_URL}/api${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        ...(auth && {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        }),
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });

    return data;
  } catch (error) {
    return ErrorHandler(error);
  }
};
