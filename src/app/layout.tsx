import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ya'Pizz | Pizzeria Itinérante",
  description: "Retrouvez notre camion à pizzas chaque semaine. Des pizzas artisanales, savoureuses et préparées avec passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
