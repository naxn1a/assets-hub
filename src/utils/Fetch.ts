import { ErrorHandler } from "./ErrorHandler";

const API_URL = `${process.env.API_URL}/api`;

export const Fetch = async (path: string, id?: string) => {
  try {
    const res = await fetch(`${API_URL}/${path}/${id ? id : ""}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return ErrorHandler(error);
  }
};
