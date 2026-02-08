import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";

import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { AuthProvider } from "@/context/AuthContext";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Suburbia Skate - Build Your Custom Skateboard",
  description: "Build your custom skateboard with AI-powered recommendations. Escape the cul-de-sac and shred the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background-dark">
      <head>
        {/* Material Icons for zine-style design */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800 bg-background-dark min-h-screen`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <SVGFilters />
      </body>
    </html>
  );
}

