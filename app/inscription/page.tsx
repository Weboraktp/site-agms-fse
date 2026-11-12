import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { coursMedical, reformArticleUrl, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comment s'inscrire au dispositif",
  description:
    "Pré-inscriptions rentrée 2027 ouvertes : dispositif gratuit sous conditions de l'AGMS pour les boursiers avec mention au bac (FSE+), ou prépa Cours Médical ouverte à tous. Demande d'inscription en ligne, sans pièce justificative."
};

const steps = [
  {
    title: "Remplissez le dossier en ligne",
    text: "La demande d'inscription se remplit en quelques minutes, gratuitement. Aucune pièce justificative n'est demandée à ce stade."
  },
  {
    title: "L'équipe vérifie l'éligibilité",
    text: "L'équipe AGMS étudie votre situation (bourse, mention au bac, parcours) et vous recontacte."
  },
  {
    title: "Entretien, puis confirmation de la place",
    text: "Un entretien précise votre besoin. Votre place est confirmée après votre admission en licence portail santé."
  }
];

const faq = [
  {
    question: "Je suis en terminale, je n'ai pas encore mes résultats. Puis-je faire ma demande ?",
    answer:
      "Oui, c'est justement le moment. Indiquez la mention que vous visez cette année : la demande ne vaut pas inscription définitive et aucune pièce n'est demandée à ce stade. Votre place n'est confirmée qu'après votre admission en licence portail santé."
  },
  {
    question: "Je n'ai pas encore reçu ma notification de bourse. Que faire ?",
    answer:
      "Choisissez « Demande en cours » dans le dossier. L'équipe AGMS vous recontactera et vous dira à quel moment et sous quelle forme transmettre votre notification, une fois que vous l'aurez reçue."
  },
  {
    question: "Je suis boursier·ère, mais sans mention au bac. Que faire ?",
    answer:
      "Faites quand même votre demande : l'éligibilité est étudiée au cas par cas par l'équipe AGMS. Selon votre situation, elle vous oriente vers le dispositif gratuit ou vers la prépa Cours Médical, ouverte à tous."
  },
  {
    question: "Que se passe-t-il si je ne suis pas retenu·e ?",
    answer:
      "L'équipe vous le dit directement et vous oriente. Vous pouvez alors rejoindre la prépa Cours Médical, ouverte à tous : l'inscription y passe par un dossier et des frais de pré-inscription, déduits du prix et entièrement remboursables."
  }
];

export default function InscriptionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pré-inscriptions rentrée 2027-2028 ouvertes"
        title="Comment s'inscrire au dispositif"
        intro="Deux chemins selon votre situation : le dispositif gratuit de l'AGMS pour les étudiants boursiers avec mention au bac, ou la prépa Cours Médical, ouverte à tous."
      />

      <section className="section section--white">
        <div className="container">
          <SectionTitle eyebrow="Quel chemin pour vous ?" title="Deux façons de rejoindre l'accompagnement" align="center" />
          <div className="actor-grid">
            <article className="actor-card actor-card--fse">
              <p className="eyebrow">Boursier·ère avec mention au bac</p>
              <h3>Candidatez au dispositif gratuit de l&apos;AGMS</h3>
              <p>
                Vous êtes boursier·ère et vous avez obtenu une mention au bac (ou vous la visez cette
                année) ? Vous candidatez ici, au dispositif gratuit sous conditions, cofinancé par
                l&apos;Union européenne (FSE+).
              </p>
              <p>
                La pré-inscription est gratuite. L&apos;équipe AGMS étudie votre dossier et établit
                votre éligibilité, dans la limite des 20 places disponibles.
              </p>
              <strong>Pré-inscription gratuite</strong>
              <div className="section-actions">
                <Link className="button button--primary" href={site.candidatureUrl}>
                  Demande d&apos;inscription
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="actor-card actor-card--agms">
              <p className="eyebrow">Pas boursier·ère, ou pas éligible</p>
              <h3>Rejoignez la prépa Cours Médical</h3>
              <p>
                Vous n&apos;êtes pas boursier·ère, ou vous n&apos;êtes pas éligible au dispositif
                gratuit ? Vous pouvez rejoindre la prépa Cours Médical, ouverte à tous.
              </p>
              <p>
                L&apos;inscription y passe par un dossier et des frais de pré-inscription (150 €
                pour la prépa annuelle, 50 € pour le stage de pré-rentrée), déduits du prix et
                entièrement remboursables.
              </p>
              <strong>Ouverte à tous, hors dispositif gratuit</strong>
              <div className="section-actions">
                <a className="button button--primary" href={coursMedical.inscriptionUrl}>
                  S&apos;inscrire à Cours Médical
                  <ExternalLink size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
          <p className="pricing-note">
            Rentrée 2027 : la licence portail santé remplace le PASS et la LAS.{" "}
            <Link className="inline-link" href={reformArticleUrl}>
              Ce qui change
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Dispositif gratuit" title="Trois étapes, sans paperasse" align="center" />
          <div className="candidate-flow">
            {steps.map((step, index) => (
              <article className="candidate-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container">
          <SectionTitle
            eyebrow="Stage de pré-rentrée"
            title="Le stage de pré-rentrée reste payant pour tous"
            intro="Le dispositif gratuit couvre l'accompagnement annuel. Le stage, lui, est payant pour tous, y compris pour les étudiants du dispositif : il se réserve auprès de Cours Médical."
            align="center"
          />
          <div className="section-actions section-actions--center">
            <a className="button button--primary" href={coursMedical.inscriptionUrl}>
              S&apos;inscrire au stage
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle eyebrow="Questions fréquentes" title="Vos questions sur l'inscription" align="center" />
          <div className="faq-list">
            {faq.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Rentrée 2027-2028</p>
            <h2>Les pré-inscriptions sont ouvertes : déposez votre demande, c&apos;est gratuit.</h2>
          </div>
          <div className="cta-band__actions">
            <Link className="button button--primary" href={site.candidatureUrl}>
              Demande d&apos;inscription
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
