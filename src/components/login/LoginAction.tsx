"use server";
import { cookies } from "next/headers";

export const loginAction = async (formData: FormData) => {
  const cookieStore = await cookies();
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`${process.env.API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.status === "error") {
      return response;
    }

    cookieStore.set("token", response.token);
    return response;
  } catch (error) {
    return { status: "error", message: "An unexpected error occurred." };
  }
};
