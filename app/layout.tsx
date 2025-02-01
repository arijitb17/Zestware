import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { Cartcontextprovider } from "@/context/CartContextprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// need to come back
export const metadata: Metadata = {
  title: "Zestwear",
  description: "Clothing Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* need to come back */}
        <Cartcontextprovider> {/* ✅ Properly wrapping */}
          <Navbar />
          {children}
        </Cartcontextprovider> {/* ✅ Properly closed */}
      </body>
    </html>
  );
}
