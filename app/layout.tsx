import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayasha Zafasha — UI/UX Designer",
  description:
    "Portfolio of Ayasha Zafasha — crafting digital experiences that are precise, purposeful, and elegantly minimal.",
  keywords: ["UI designer", "UX designer", "portfolio", "product design", "case studies"],
  openGraph: {
    title: "Ayasha Zafasha — UI/UX Designer",
    description: "Crafting digital experiences that are precise, purposeful, and elegantly minimal.",
    type: "website",
  },
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
