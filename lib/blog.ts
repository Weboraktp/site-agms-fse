import type { ComponentType } from "react";
import { LicencePortailSante } from "@/components/articles/LicencePortailSante";
import { MajorRencontre } from "@/components/articles/MajorRencontre";

export type BlogPost = {
  slug: string;
  title: string;
  /** Titre court pour les cartes et le titre de page, si différent du titre affiché. */
  seoTitle?: string;
  date: string;
  dateISO: string;
  author: string;
  excerpt: string;
  keywords?: string[];
  /** Mis en avant dans « Actualités » sur l'accueil. */
  news?: boolean;
  image?: string;
  imageAlt?: string;
  /** Contenu de l'article (tableaux, schémas, listes). */
  Body: ComponentType;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "fin-pass-las-2027-licence-portail-sante",
    title: "PASS et LAS disparaissent en 2027 : ce que change la licence portail santé",
    seoTitle: "Fin du PASS et de la LAS en 2027 : la licence portail santé expliquée",
    date: "12 novembre 2026",
    dateISO: "2026-11-12",
    author: "Kémi ATEXIDE",
    excerpt:
      "Licence portail santé : ce qui change à la rentrée 2027 et ce que la réforme prévoit pour les lycéens, les étudiants en PASS, LAS, licence ou IFSI.",
    keywords: [
      "licence portail santé",
      "réforme PASS LAS 2027",
      "études de santé Guadeloupe",
      "LPS",
      "passerelle médecine"
    ],
    news: true,
    image: "/images/blog/lps-classement-par-tranches.webp",
    imageAlt: "Schéma du classement par tranches en licence portail santé",
    Body: LicencePortailSante
  },
  {
    slug: "major-2024-2025-rencontre-etudiants",
    title: "Le major 2024-2025 à la rencontre de nos étudiants",
    date: "22 octobre 2026",
    dateISO: "2026-10-22",
    author: "L'équipe AGMS",
    excerpt:
      "Sa méthode de travail, sa façon d'aborder l'année, puis un temps de questions-réponses : retour sur l'intervention du major 2024-2025 auprès de nos étudiants, le 22 octobre 2026.",
    news: true,
    image: "/images/vie-de-l-accompagnement/intervention-major-2024-2025.webp",
    imageAlt: "Le major 2024-2025 face aux étudiants, dans une salle de cours",
    Body: MajorRencontre
  }
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
