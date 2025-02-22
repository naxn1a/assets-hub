import { Home, User, Package, Clipboard, Settings } from "lucide-react";

export default [
  {
    title: "Home",
    url: "/",
    icon: Home,
    role: ["Admin", "Hr", "It", "Account"],
  },
  // Hr
  {
    title: "Employee",
    url: "/employee",
    icon: User,
    role: ["Admin", "Hr"],
  },
  // It
  {
    title: "Asset",
    icon: Package,
    role: ["Admin", "It", "Hr"],
    sub: [
      {
        title: "Inventory",
        url: "/inventory",
        role: ["Admin", "It", "Hr"],
      },
      {
        title: "Report",
        url: "/report",
        role: ["Admin", "It", "Hr"],
      },
      {
        title: "Request",
        url: "/request",
        role: ["Admin", "It", "Hr"],
      },
    ],
  },
  // Account
  {
    title: "History",
    url: "/history",
    icon: Clipboard,
    role: ["Admin", "Account"],
  },
  // Setting
  {
    title: "Setting",
    url: "/setting",
    icon: Settings,
    role: ["Admin"],
  },
];
