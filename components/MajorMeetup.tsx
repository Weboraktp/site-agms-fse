import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { majorMeetup } from "@/lib/content";

export const majorArticleUrl = "/blog/major-2024-2025-rencontre-etudiants";

export function MajorMeetupFigure() {
  return (
    <figure className="meetup__figure">
      <img
        src={majorMeetup.image}
        alt="Le major 2024-2025 présente sa méthode de travail à un groupe d'étudiants, dans une salle de cours"
        width={1200}
        height={900}
        loading="lazy"
      />
      <figcaption>{majorMeetup.caption}</figcaption>
    </figure>
  );
}

export function MajorMeetupTestimonial() {
  return (
    <figure className="meetup__quote">
      <p className="eyebrow">Témoignage d&apos;une étudiante</p>
      <blockquote>« {majorMeetup.testimonial.quote} »</blockquote>
      <figcaption>— {majorMeetup.testimonial.author}</figcaption>
    </figure>
  );
}

type MajorMeetupProps = {
  /** Fond blanc (par défaut) ou fond crème, pour alterner avec les sections voisines. */
  white?: boolean;
};

/** Section « Vie de l'accompagnement » : l'intervention du major, son programme et un témoignage. */
export function MajorMeetup({ white = true }: MajorMeetupProps) {
  return (
    <section className={`section ${white ? "section--white" : ""}`}>
      <div className="container meetup">
        <MajorMeetupFigure />
        <div>
          <p className="eyebrow">Vie de l&apos;accompagnement</p>
          <h2 className="meetup__title">{majorMeetup.title}</h2>
          <p className="meetup__intro">{majorMeetup.intro} Au programme :</p>
          <ul className="check-list">
            {majorMeetup.programme.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <MajorMeetupTestimonial />
          <Link className="inline-link" href={majorArticleUrl}>
            Lire l&apos;actualité
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
