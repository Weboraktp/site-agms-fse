import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StickyCTA() {
  return (
    <Link className="sticky-cta" href="/candidature" aria-label="Candidater au dispositif FSE">
      <span>Candidater</span>
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
