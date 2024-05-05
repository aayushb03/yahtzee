import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
// eslint-disable-next-line
import { Irish_Grover } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/services/userContext";

const irishGrover = Irish_Grover({ weight:"400", subsets: ["latin"] });

/**
 * Metadata for the root layout.
 */
export const metadata: Metadata = {
  title: "Yahtzee",
  description: "Yahtzee game built with NextJS and TypeScript",
};

/**
 * The root layout for the application.
 * @param children
 * @returns JSX.Element
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <SpeedInsights />
      <html lang="en">
        <body className={irishGrover.className}>{children}</body>
      </html>
    </UserProvider>
  );
}
