import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latestx - Universal Package Manager",
  description: "The ultimate universal package manager for all your dependencies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
