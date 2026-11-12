import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MajorMeetupFigure, MajorMeetupTestimonial } from "@/components/MajorMeetup";
import { majorMeetup, site } from "@/lib/content";

export function MajorRencontre() {
  return (
    <>
      <p className="article-lead">{majorMeetup.intro}</p>

      <MajorMeetupFigure />

      <h2>Au programme</h2>
      <ul className="article-list">
        {majorMeetup.programme.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        Entendre quelqu&apos;un qui a réussi raconter ses doutes, son organisation et ses
        ajustements au fil de l&apos;année aide à prendre du recul sur la sienne. C&apos;est tout
        l&apos;esprit de ces rencontres : montrer que la réussite se construit avec une méthode, de
        la régularité et un entourage, pas avec un talent réservé à quelques-uns.
      </p>

      <h2>Ce que les étudiants en retiennent</h2>
      <MajorMeetupTestimonial />

      <aside className="article-banner">
        <p>
          <strong>Pré-inscriptions ouvertes.</strong>{" "}Accompagnement gratuit, sous conditions,
          réservé aux étudiants boursiers éligibles : découvrez comment faire votre demande.
        </p>
        <Link className="button button--primary" href={site.inscriptionUrl}>
          Comment s&apos;inscrire
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </aside>
    </>
  );
}
