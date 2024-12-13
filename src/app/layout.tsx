import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
