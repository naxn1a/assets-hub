import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Provider from "@/provider";
import SessionProvider from "@/provider/Session";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthContextProvider from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Assets Hub",
  description: "",
};

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={prompt.className}>
        <SessionProvider session={session}>
          <AuthContextProvider>
            <Provider>{children}</Provider>
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
