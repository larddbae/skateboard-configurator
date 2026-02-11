import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono, Anton, Bebas_Neue, Permanent_Marker, Rubik, Roboto_Mono, Courier_Prime } from "next/font/google"; // [NEW] Added fonts

import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/CartSidebar";

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

const anton = Anton({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
  weight: "400",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
  weight: "400",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marker",
  weight: "400",
});

// [NEW] Added fonts configuration
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: ["400", "700", "900"],
});

const roboto = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["400", "700"],
});

const courier = Courier_Prime({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-courier",
  weight: ["400", "700"],
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
    <html lang="en">
      <body
        className={`${bowlby.variable} ${dmMono.variable} ${anton.variable} ${bebas.variable} ${marker.variable} ${rubik.variable} ${roboto.variable} ${courier.variable} antialiased font-mono font-medium text-zinc-800 bg-background-light min-h-screen`}
      >
        {/* Material Icons for zine-style design */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* Material Symbols Outlined for new design */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

        <AuthProvider>
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </AuthProvider>
        <SVGFilters />
      </body>
    </html>
  );
}

