"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOut() {
  return (
    <Button onClick={() => signOut()} className="text-lg font-semibold">
      Logout
    </Button>
  );
}
