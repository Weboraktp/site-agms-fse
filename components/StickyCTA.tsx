import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";

export function StickyCTA() {
  return (
    <Link className="sticky-cta" href={site.questionnaireUrl} aria-label="Trouver la voie adaptée">
      <span>Trouver ma voie</span>
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
