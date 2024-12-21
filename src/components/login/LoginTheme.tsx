"use client";
import { useTheme } from "next-themes";

export default function LoginTheme({ text }: { text: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return <button onClick={toggleTheme}>{text}</button>;
}
