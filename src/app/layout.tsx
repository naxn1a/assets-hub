import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Provider from "@/provider";

export const metadata: Metadata = {
  title: "Assets Hub",
  description: "",
};

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={prompt.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
