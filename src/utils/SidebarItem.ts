import { Home, User, Package, Clipboard, Settings } from "lucide-react";

export default [
  // Home
  {
    title: "Home",
    url: "/",
    icon: Home,
    dept: [
      "Admin",
      "Human resource",
      "Account",
      "Information Technology",
      "General",
    ],
  },
  // Human resource
  {
    title: "User",
    url: "/user",
    icon: User,
    dept: ["Admin", "Human resource"],
  },
  // Information Technology
  {
    title: "Asset",
    icon: Package,
    dept: ["Admin", "Human resource", "Information Technology"],
    sub: [
      {
        title: "Inventory",
        url: "/asset/inventory",
        dept: ["Admin", "Information Technology"],
      },
      {
        title: "Report",
        url: "/asset/report",
        dept: ["Admin", "Information Technology"],
      },
      {
        title: "Request",
        url: "/asset/request",
        dept: ["Admin", "Human resource"],
      },
    ],
  },
  // Account
  {
    title: "History",
    url: "/history",
    icon: Clipboard,
    dept: ["Admin", "Account"],
  },
  // Setting
  {
    title: "Setting",
    url: "/setting",
    icon: Settings,
    dept: ["Admin"],
  },
];
