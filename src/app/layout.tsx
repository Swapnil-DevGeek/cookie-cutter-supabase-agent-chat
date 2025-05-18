import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthProvider } from "@/providers/Auth";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next-Supabase-Agent-chat Cookie cutter",
  description: "A cookie cutter platform for building agent orchestration platforms with Next.js, Supabase, and Nuqs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NuqsAdapter>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
