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
    url: "/asset",
    icon: Package,
    role: ["Admin", "It"],
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
