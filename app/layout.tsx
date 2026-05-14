import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StickyCTA } from "@/components/StickyCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AGMS — Dispositif FSE+ PASS/LAS",
    template: "%s | AGMS — Dispositif FSE+ PASS/LAS"
  },
  description:
    "Site institutionnel du dispositif FSE+ porté par l'AGMS pour accompagner gratuitement 60 étudiants boursiers sélectionnés en PASS/LAS en Guadeloupe.",
  metadataBase: new URL("https://agms-dispositif-fse.local"),
  openGraph: {
    title: "AGMS — Dispositif FSE+ PASS/LAS",
    description:
      "Un accompagnement gratuit, sous réserve d'éligibilité et de sélection, pour les étudiants boursiers engagés en PASS/LAS en Guadeloupe.",
    type: "website",
    locale: "fr_FR"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main>{children}</main>
        <StickyCTA />
        <Footer />
      </body>
    </html>
  );
}
