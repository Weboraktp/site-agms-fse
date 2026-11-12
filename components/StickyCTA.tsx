"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";

export function StickyCTA() {
  const pathname = usePathname();
  if (pathname === site.candidatureUrl || pathname.startsWith("/admin")) return null;

  return (
    <Link className="sticky-cta" href={site.candidatureUrl} aria-label="Faire ma demande d'inscription">
      <span>Demande d'inscription</span>
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
