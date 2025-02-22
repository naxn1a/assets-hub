"use server";
import { ErrorHandler } from "./ErrorHandler";

interface FetchDataProps {
  path: string;
  body?: any;
  auth?: boolean;
}

export const fetchData = async ({ path, body }: FetchDataProps) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch data");

    return data;
  } catch (error) {
    return ErrorHandler(error);
  }
};
