import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hind_Siliguri } from "next/font/google";
import { SITE_DESCRIPTION } from "@/lib/config";
import "./globals.css";

// Hind Siliguri has good Bengali letter shapes. next/font downloads it once at build time.
const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "কঠিন চীবরদান ক্যালেন্ডার ২০২৬",
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={hind.variable}>
      <body>{children}</body>
    </html>
  );
}
