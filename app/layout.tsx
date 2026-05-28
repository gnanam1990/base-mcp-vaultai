import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultAI",
  description: "AI-selected vault strategy proposals for Base DeFi.",
  other: {
    "talentapp:project_verification":
      "99496f31e1142a7646158d66de063eabc2fd3caf4da030274291be9aae41e1d763171c1edd159b8660a96df0ce18245fffcc9575e8eb25ca0b89859a1d5898d3",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
