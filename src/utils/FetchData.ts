"use server";
import { ErrorHandler } from "./ErrorHandler";

interface FetchDataProps {
  method?: "GET" | "POST";
  path: string;
  body?: any;
}

export const fetchData = async ({ method, path, body }: FetchDataProps) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api${path}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return ErrorHandler(error);
  }
};
