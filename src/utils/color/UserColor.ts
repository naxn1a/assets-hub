import { UserStatus as s } from "@prisma/client";

export const UserStatus = (status: string) => {
  let color = "";

  switch (status) {
    case s.Active:
      color = "bg-green-100 text-green-700";
      break;
    case s.Inactive:
      color = "bg-red-100 text-red-700";
      break;
    default:
      color = "bg-gray-100 text-gray-700";
      break;
  }
  return color;
};
