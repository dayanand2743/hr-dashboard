import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientWrapper } from "./components/ClientWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HR Dashboard - Employee Performance Management",
  description: "A comprehensive HR dashboard for tracking employee performance, managing bookmarks, and viewing detailed insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
