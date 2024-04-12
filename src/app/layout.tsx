import type { Metadata } from "next";
// eslint-disable-next-line
import { Irish_Grover } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/services/userContext";

const irishGrover = Irish_Grover({ weight:"400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yahtzee",
  description: "Yahtzee game built with NextJS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={irishGrover.className}>{children}</body>
      </html>
    </UserProvider>
  );
}
