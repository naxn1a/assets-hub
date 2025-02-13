"use server";
import { fetchData } from "@/utils/FetchData";
import { cookies } from "next/headers";

export const loginAction = async (formData: FormData) => {
  const cookieStore = await cookies();
  const body = Object.fromEntries(formData.entries());

  try {
    const data = await fetchData({
      path: "/login",
      body,
      auth: false,
    });

    if (data.status === "error") {
      return data;
    }

    cookieStore.set("token", data.token);
    return data;
  } catch (error) {
    return { status: "error", message: "An unexpected error occurred." };
  }
};
