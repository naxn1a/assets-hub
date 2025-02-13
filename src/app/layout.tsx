import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Provider from "@/provider";
import SessionProvider from "@/provider/Session";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={prompt.className}>
        <SessionProvider session={session}>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
