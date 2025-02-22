"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onHandleClick = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Button variant="outline" size="icon" onClick={onHandleClick}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
