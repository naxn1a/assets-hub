import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assets Hub",
  description: "A hub for all your assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
