"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";

export function StickyCTA() {
  const pathname = usePathname();
  if (pathname === site.preinscriptionUrl || pathname.startsWith("/admin")) return null;

  return (
    <Link className="sticky-cta" href={site.questionnaireUrl} aria-label="Trouver la voie adaptée">
      <span>Trouver ma voie</span>
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
