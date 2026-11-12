import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { espaceEtudiantUrl } from "@/lib/content";

const screens = [
  {
    src: "/images/plateforme/progression.webp",
    title: "Votre progression",
    text: "Moyennes, forme du moment, régularité et avancement matière par matière : vous savez où vous en êtes."
  },
  {
    src: "/images/plateforme/qcm.webp",
    title: "Des QCM en conditions d'examen",
    text: "Séries complètes ou courtes, corrigées et expliquées, à refaire autant de fois que nécessaire."
  },
  {
    src: "/images/plateforme/classement.webp",
    title: "Les classements",
    text: "Général, par matière, par QCM ou à l'assiduité, sous pseudonyme : pour se situer et rester motivé."
  },
  {
    src: "/images/plateforme/annales.webp",
    title: "Les annales, faisables en ligne",
    text: "Les sujets des sessions précédentes, matière par matière, à passer en ligne avec leur correction."
  },
  {
    src: "/images/plateforme/salle-etude.webp",
    title: "La salle d'étude, du lundi au samedi",
    text: "Réservez votre créneau pour réviser au calme dans nos locaux de Jarry."
  },
  {
    src: "/images/plateforme/entrevues.webp",
    title: "Une entrevue en cas de difficulté",
    text: "Une matière qui décroche, une méthode qui ne marche pas : demandez à être reçu·e, en présentiel ou en visio."
  }
];

type PlatformShowcaseProps = {
  /** Fond blanc, ou fond « motion » (par défaut) pour alterner avec les sections voisines. */
  white?: boolean;
};

/** Captures de l'espace étudiant (compte de démonstration, sans donnée d'élève). */
export function PlatformShowcase({ white = false }: PlatformShowcaseProps) {
  return (
    <section className={`section ${white ? "section--white" : "section--motion"}`}>
      <div className="container">
        <SectionTitle
          eyebrow="Plateforme pédagogique"
          title="La plateforme pédagogique"
          intro="Chaque étudiant accède à son espace personnel : progression, QCM et classements, annales en ligne, réservation de la salle d'étude, demandes d'entrevue et agenda, sur ordinateur comme sur téléphone."
          align="center"
        />

        <div className="showcase">
          <figure className="showcase__desktop">
            <div className="browser-frame">
              <div className="browser-frame__bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <p>espace.coursmedical.fr</p>
              </div>
              <img
                src="/images/plateforme/accueil.webp"
                alt="Tableau de bord de l'espace étudiant : nouveaux cours, QCM à faire, séances de la semaine et annonces"
                width={800}
                height={500}
                loading="lazy"
              />
            </div>
            <figcaption>Le tableau de bord : ce qui est nouveau, ce qui reste à faire, la semaine à venir.</figcaption>
          </figure>

          <figure className="showcase__phone">
            <div className="phone-frame">
              <img
                src="/images/plateforme/mobile-agenda.webp"
                alt="L'agenda de la semaine sur téléphone"
                width={684}
                height={1500}
                loading="lazy"
              />
            </div>
            <figcaption>Aussi sur téléphone.</figcaption>
          </figure>
        </div>

        <div className="showcase__grid">
          {screens.map((screen) => (
            <figure className="showcase__card" key={screen.src}>
              <a
                className="browser-frame browser-frame--small"
                href={screen.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${screen.title} (agrandir la capture)`}
              >
                <img src={screen.src} alt={screen.title} width={800} height={500} loading="lazy" />
              </a>
              <figcaption>
                <strong>{screen.title}</strong>
                <span>{screen.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="pricing-note">
          Captures d&apos;un compte de démonstration, chiffres donnés à titre d&apos;illustration.
        </p>

        <div className="section-actions section-actions--center">
          <a className="inline-link" href={espaceEtudiantUrl}>
            Déjà inscrit·e ? Accéder à mon espace
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
