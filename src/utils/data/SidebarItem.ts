import {
  Home,
  User,
  Package,
  Clipboard,
  Settings,
  FileText,
} from "lucide-react";

export default [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Employee",
    url: "/employee",
    icon: User,
  },
  {
    title: "Request Asset",
    url: "/request-asset",
    icon: FileText,
  },
  {
    title: "Asset",
    url: "/asset",
    icon: Package,
  },
  {
    title: "Document",
    url: "/document",
    icon: Clipboard,
  },
  {
    title: "Setting",
    url: "/setting",
    icon: Settings,
  },
];
