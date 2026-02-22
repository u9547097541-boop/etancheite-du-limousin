import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Étanchéité du Limousin - Étanchéité, Toiture & Bardage à Limoges",
  description:
    "Étanchéité du Limousin, spécialiste en étanchéité bitume, étanchéité liquide, toiture végétalisée et bardage isolation à Limoges, Guéret et départements 87, 19, 23, 24. Depuis 1998.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
      </head>
      <body className="antialiased bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
