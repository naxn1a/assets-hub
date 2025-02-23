import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/provider/Session";
import AuthContextProvider from "@/context/AuthContext";
import { ThemeProvider } from "@/provider/Theme";

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
            <ThemeProvider>{children}</ThemeProvider>
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
