import { AssetStatus as s } from "@prisma/client";

export const AssetStatus = (status: string) => {
  let color = "";

  switch (status) {
    case s.Available:
      color = "bg-green-100 text-green-700";
      break;
    case s.Assigned:
      color = "bg-blue-100 text-blue-700";
      break;
    case s.Maintenance:
      color = "bg-yellow-100 text-yellow-700";
      break;
    case s.Returned:
      color = "bg-green-100 text-green-700";
      break;
    case s.Disposed:
      color = "bg-red-100 text-red-700";
      break;
    case s.Lost:
      color = "bg-red-100 text-red-700";
      break;
    default:
      color = "bg-gray-100 text-gray-700";
      break;
  }
  return color;
};
