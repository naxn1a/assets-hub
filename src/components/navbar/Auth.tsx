"use client";
import { useEffect, useState } from "react";

export default function Auth() {
  const [user, setUser] = useState<{
    firstname: string;
    lastname: string;
  } | null>(null);

  useEffect(() => {
    const userData = JSON.parse(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("x-user-data="))
        ?.split("=")[1] || "{}"
    );
    setUser(userData);
  }, []);
  return (
    <section>
      {user ? (
        <h1>
          {user.firstname} {user.lastname}
        </h1>
      ) : null}
    </section>
  );
}
