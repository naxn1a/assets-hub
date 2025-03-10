"use client";
import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

type AuthContextType = {
  user: {
    id: string;
    email: string;
    dept: string;
    role: string;
  };
};

export const AuthContext = createContext<AuthContextType>({
  user: {
    id: "",
    email: "",
    dept: "",
    role: "",
  },
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession() as any;

  return (
    <AuthContext.Provider
      value={{
        user: {
          id: session?.user?.id,
          email: session?.user?.email,
          dept: session?.user?.dept,
          role: session?.user?.role,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useMyContext = () => useContext(AuthContext);
