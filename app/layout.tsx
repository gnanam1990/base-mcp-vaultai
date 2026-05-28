import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultAI",
  description: "AI-selected vault strategy proposals for Base DeFi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
