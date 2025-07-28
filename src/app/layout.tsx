import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- この一行が最も重要です

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "基板修理.com | 他店で断られたiPhone修理",
  description: "データそのまま、高い復旧率。リンゴループ、起動不良、水没など、あらゆる重度故障に専門技術者が対応します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}