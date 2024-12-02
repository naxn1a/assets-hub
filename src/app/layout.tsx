import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assets Hub",
  description: "A hub for all your assets",
};

const prompt = Prompt({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
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
