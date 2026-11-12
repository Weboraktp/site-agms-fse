import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StickyCTA } from "@/components/StickyCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AGMS — Accompagnement gratuit études de santé : licence portail santé, PASS, LAS",
    template: "%s | AGMS — Dispositif FSE+ PASS/LAS"
  },
  description:
    "Dispositif AGMS en Guadeloupe : accompagnement gratuit sous conditions vers les études de santé (licence portail santé, PASS, LAS) ou accompagnement payant ouvert à tous. Pré-inscriptions ouvertes pour la rentrée 2027.",
  metadataBase: new URL("https://www.dispositif-agms.fr"),
  verification: {
    other: {
      "facebook-domain-verification": "gtt8rf3t5ki6u2in44e1ld12tsq1g2"
    }
  },
  openGraph: {
    title: "AGMS — Accompagnement gratuit études de santé : licence portail santé, PASS, LAS",
    description:
      "Une demande d'inscription en ligne pour confirmer la voie adaptée : dispositif gratuit sous conditions ou accompagnement payant ouvert à tous.",
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
