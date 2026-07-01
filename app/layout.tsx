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
    "Site institutionnel AGMS pour orienter les étudiants PASS/LAS en Guadeloupe vers le dispositif gratuit sous conditions ou vers un accompagnement ouvert à tous.",
  metadataBase: new URL("https://agms-dispositif-fse.local"),
  openGraph: {
    title: "AGMS — Dispositif FSE+ PASS/LAS",
    description:
      "Un questionnaire d'orientation pour confirmer la voie adaptée : dispositif gratuit sous conditions ou accompagnement ouvert à tous.",
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
