import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Word Buddies",
  description: "A fun place for kids to learn new words.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${baloo.className} antialiased`}>{children}</body>
    </html>
  );
}
