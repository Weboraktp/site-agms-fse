import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/content";

type Row = ReactNode[];

function Table({ head, rows, caption }: { head: string[]; rows: Row[]; caption?: string }) {
  return (
    <div className="article-table">
      <table>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {head.map((cell, index) => (
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={index}>{cell}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="article-figure">
      <a href={src} target="_blank" rel="noreferrer" aria-label={`${caption} (agrandir le schéma)`}>
        <img src={src} alt={alt} loading="lazy" />
      </a>
      <figcaption>{caption} · touchez le schéma pour l&apos;agrandir</figcaption>
    </figure>
  );
}

const toc = [
  { id: "ce-qui-change", label: "Ce qui change concrètement" },
  {
    id: "objectif",
    label: "L'objectif en licence portail santé, concrètement",
    children: [
      { id: "matieres", label: "Quelles matières ?" },
      { id: "examens", label: "Quand passe-t-on les examens ?" },
      { id: "notes", label: "Quelles notes faut-il avoir ?" },
      { id: "classement", label: "Comment fonctionne le classement ?" },
      { id: "exemple-chiffre", label: "Un exemple chiffré du classement par tranches" },
      { id: "places", label: "Combien de places pour chaque chance ?" },
      { id: "exemples-pratiques", label: "Exemples pratiques : qui est admis, qui ne l'est pas ?" },
      { id: "cinq-etudiants", label: "Cinq étudiants, cinq situations" },
      { id: "calcul", label: "Le calcul en détail, pas à pas" },
      { id: "choix-filiere", label: "Le choix de la filière" },
      { id: "seconde-chance", label: "La seconde chance, en pratique" },
      { id: "redoublement", label: "Le redoublement, en pratique" }
    ]
  },
  { id: "quatre-issues", label: "En fin de première année : les quatre issues possibles" },
  {
    id: "cas-par-cas",
    label: "Votre situation, cas par cas",
    children: [
      { id: "terminale", label: "Vous êtes en terminale ou en première" },
      { id: "pass", label: "Vous êtes en PASS" },
      { id: "las", label: "Vous êtes en LAS 1, LAS 2 ou LAS 3" },
      { id: "deja-fait", label: "Vous avez déjà fait un PASS, une LAS ou une PACES" },
      { id: "licence", label: "Vous êtes en licence, sans option santé" },
      { id: "infirmier-medecine", label: "Vous visez à la fois infirmier et médecine" },
      { id: "diplome-sante", label: "Vous êtes diplômé d'une profession de santé" },
      { id: "ifsi", label: "Vous êtes étudiant en IFSI" },
      { id: "europe", label: "Vous étudiez la santé dans un autre pays européen" },
      { id: "kine", label: "Vous visez la kinésithérapie" }
    ]
  },
  { id: "dates", label: "Les dates à retenir" },
  { id: "a-preciser", label: "Ce qui reste à préciser" },
  { id: "conseils", label: "Nos conseils" },
  { id: "lexique", label: "Annexe : petit lexique" },
  { id: "sources", label: "Sources" }
];

const sources = [
  {
    label: "Décret n° 2026-988 du 23 octobre 2026",
    publisher: "Légifrance",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000055012146"
  },
  {
    label: "La licence portail santé remplacera les PASS/LAS dès la rentrée 2027",
    publisher: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/actualites/A18890"
  },
  {
    label: "Communiqué du ministère de l'Enseignement supérieur",
    href: "https://www.enseignementsup-recherche.gouv.fr/fr/acces-aux-etudes-de-sante-la-licence-portail-sante-remplacera-le-passlas-des-la-rentree-2027-104436"
  },
  {
    label: "Les voies d'accès aux études de maïeutique, médecine, odontologie, pharmacie",
    publisher: "Onisep",
    href: "https://www.onisep.fr/formation/les-principaux-domaines-de-formation/les-etudes-de-sante/les-voies-d-acces-aux-etudes-de-maieutique-medecine-odontologie-pharmacie"
  },
  {
    label: "La licence portail santé remplacera les PASS-LAS à la rentrée 2027",
    publisher: "L'Etudiant",
    href: "https://www.letudiant.fr/etudes/medecine-sante/etudes-de-sante-la-licence-portail-sante-remplacera-les-pass-las-a-la-rentree-2027.html"
  },
  {
    label: "Réforme Pass/LAS : ce que l'on sait de la future première année",
    publisher: "L'Etudiant (document de travail, juin 2026)",
    href: "https://www.letudiant.fr/etudes/medecine-sante/reforme-pass-las-ce-que-l-on-sait-de-la-future-premiere-annee-en-etudes-de-sante.html"
  },
  {
    label: "Licence « portail santé » : le Pass-LAS vit ses derniers mois",
    publisher: "Le Moniteur des pharmacies (projet d'arrêté, juillet 2026)",
    href: "https://www.lemoniteurdespharmacies.fr/profession/socio-professionnel/licence-portail-sante-le-pass-las-vit-ses-derniers-mois"
  },
  {
    label: "Calendrier Parcoursup 2026-2027",
    publisher: "Parcoursup",
    href: "https://www.parcoursup.gouv.fr/sites/default/files/database/documents/2026-10/calendrier-parcoursup-2027-805.pdf"
  },
  {
    label: "Article R. 631-1 du code de l'éducation, version antérieure à la réforme",
    publisher: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049907046"
  },
  {
    label: "Décret n° 2019-1125 du 4 novembre 2019, ancien système d'accès",
    publisher: "Légifrance",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039309275"
  },
  {
    label: "Les voies d'accès aux études de kinésithérapie",
    publisher: "Onisep",
    href: "https://www.onisep.fr/formation/les-principaux-domaines-de-formation/les-etudes-de-sante/les-voies-d-acces-aux-etudes-de-kinesitherapie"
  },
  {
    label: "Licence Portail Santé : un cadre enfin officiellement posé",
    publisher: "communiqué des fédérations étudiantes du 27 octobre 2026",
    href: "https://toute-la.veille-acteurs-sante.fr/246636/licence-portail-sante-un-cadre-enfin-officiellement-pose-mais-des-moyens-encore-a-garantir-communique/"
  },
  {
    label: "Comment accéder aux études de kiné ?",
    publisher: "L'Etudiant",
    href: "https://www.letudiant.fr/etudes/medecine-sante/comment-acceder-aux-etudes-de-kine.html"
  }
];

function InscriptionsBanner() {
  return (
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
  );
}

export function LicencePortailSante() {
  return (
    <>
      <p className="article-lead">
        <strong>
          C&apos;est officiel : à la rentrée 2027, le PASS et la LAS laissent place à une voie
          unique, la licence portail santé (LPS).
        </strong>{" "}
        Le décret n° 2026-988 du 23 octobre 2026 a été publié au Journal officiel le 24 octobre.
        Les étudiants déjà en PASS ou en LAS, eux, terminent leur parcours avec les règles
        actuelles jusqu&apos;à la fin de l&apos;année 2028-2029.
      </p>
      <p>
        Lycéens, étudiants en PASS ou en LAS, en licence, en IFSI, professionnels paramédicaux,
        parents : voici ce qui change, et ce que cela signifie pour vous.
      </p>

      <InscriptionsBanner />

      <nav className="article-toc" aria-labelledby="sommaire">
        <h2 id="sommaire">Sommaire</h2>
        <ol>
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
              {item.children ? (
                <ol>
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <a href={`#${child.id}`}>{child.label}</a>
                    </li>
                  ))}
                </ol>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      <h2 id="ce-qui-change">Ce qui change concrètement</h2>
      <p>
        La licence portail santé est la première année d&apos;une licence, organisée autour
        d&apos;un bloc santé commun. Elle mène aux études de médecine, de pharmacie,
        d&apos;odontologie et de maïeutique.
      </p>
      <Table
        head={["", "PASS / LAS (jusqu'en 2026)", "Licence portail santé (dès 2027)"]}
        rows={[
          [
            "Entrée",
            "Deux voies, des règles différentes selon les universités",
            "Un seul vœu sur Parcoursup, avec un ou plusieurs sous-vœux selon la discipline"
          ],
          [
            "Contenu de l'année",
            "Majeure et mineure",
            "60 crédits en trois blocs : santé (24 à 30), disciplinaire (24 à 30), transversal (6 à 12)"
          ],
          [
            "Discipline associée",
            "Très variée, parfois éloignée de la santé",
            "Une mention de licence choisie dans une liste nationale, ou la formation en soins infirmiers"
          ],
          [
            "Classement",
            "Écrits et oraux selon les universités",
            "Rang dans votre discipline sur toutes vos notes de première session, puis départage sur le bloc santé ; pas d'oraux prévus par le décret"
          ],
          ["Nombre de chances", "Deux", "Deux"],
          ["Redoublement", "Interdit en PASS", "Possible une fois, sous conditions"],
          [
            "En cas d'échec",
            "Poursuite en licence",
            "Poursuite en 2e année de licence ou en formation en soins infirmiers"
          ]
        ]}
      />
      <p>Trois règles méritent une attention particulière.</p>
      <p>
        <strong>Les deux blocs principaux ne se compensent pas.</strong>{" "}Pour être classé, il faut
        valider 60 crédits, dont le bloc santé et le bloc disciplinaire séparément. Une bonne note
        en santé ne rattrape pas une discipline non validée.
      </p>
      <p>
        <strong>Le redoublement ne donne pas une chance de plus.</strong>{" "}L&apos;année redoublée
        n&apos;ouvre pas de candidature en filière santé, sauf dérogation exceptionnelle. Les
        redoublants sont ensuite classés après ceux qui n&apos;ont pas redoublé.
      </p>
      <p>
        <strong>La seconde chance se joue en fin de 2e année.</strong>{" "}Elle se présente dans la
        même mention de licence, l&apos;année qui suit la validation de la première année, avec 60
        crédits supplémentaires.
      </p>

      <h2 id="objectif">L&apos;objectif en licence portail santé, concrètement</h2>
      <p>
        L&apos;objectif tient en deux étapes : <strong>valider votre année</strong>, puis{" "}
        <strong>être assez bien classé</strong>{" "}pour obtenir une place en médecine, pharmacie,
        odontologie ou maïeutique. Valider ne suffit pas, et il n&apos;existe aucune moyenne qui
        garantit l&apos;admission.
      </p>

      <h3 id="matieres">Quelles matières ?</h3>
      <Table
        head={["Bloc", "Crédits", "Ce que vous étudiez"]}
        rows={[
          [
            "Santé",
            "24 à 30",
            "Anatomie, physiologie, biologie, sciences du médicament, physique et chimie appliquées, santé publique, éthique"
          ],
          [
            "Disciplinaire",
            "24 à 30",
            "Les cours d'une licence classique (sciences, psychologie, droit, STAPS…) ou de la formation en soins infirmiers"
          ],
          [
            "Transversal",
            "6 à 12",
            "Analyse et synthèse, expression écrite et orale, langues, numérique, découverte des métiers de la santé"
          ]
        ]}
      />
      <p>
        Les matières indiquées pour le bloc santé sont celles des projets de texte : la liste
        officielle des matières et des licences possibles sera fixée par arrêté. Chaque université
        décide du poids exact de chaque bloc, dans ces fourchettes.
      </p>

      <h3 id="examens">Quand passe-t-on les examens ?</h3>
      <p>
        Les examens ont lieu pendant l&apos;année universitaire, selon le calendrier de chaque
        université, qui n&apos;est pas encore publié. Un point est déjà fixé : le classement de fin
        de première année repose sur les notes de <strong>première session</strong>. Ne comptez
        donc pas sur les rattrapages pour vous classer.
      </p>

      <h3 id="notes">Quelles notes faut-il avoir ?</h3>
      <p>
        <strong>Étape 1 : valider.</strong>{" "}Vous devez obtenir les 60 crédits de l&apos;année, en
        validant séparément le bloc santé et le bloc disciplinaire. À l&apos;université, valider
        signifie en règle générale obtenir la moyenne, soit 10 sur 20 ; les modalités précises
        seront fixées par chaque université.
      </p>
      <p>
        <strong>Étape 2 : se classer.</strong>{" "}C&apos;est votre rang qui décide, pas une note
        seuil. Le nombre de places est fixé par chaque université. La moyenne du dernier admis
        variera donc d&apos;une université et d&apos;une année à l&apos;autre, et personne ne peut
        la connaître à l&apos;avance pour cette première promotion.
      </p>
      <p>
        Un exemple pour fixer les idées, en retenant une validation à 10 sur 20 : avec 15 de
        moyenne en santé mais 9 dans votre discipline, vous n&apos;êtes pas classé, car les deux
        blocs ne se compensent pas. Avec 11 partout, votre année est validée, mais votre admission
        dépendra de votre rang.
      </p>

      <h3 id="classement">Comment fonctionne le classement ?</h3>
      <p>
        Non, le classement ne se fait pas uniquement sur le bloc santé. Il se fait en deux étapes,
        et seules les notes de première session comptent.
      </p>
      <ol className="article-list">
        <li>
          <strong>Dans votre discipline, sur toutes vos notes.</strong>{" "}Vous êtes classé parmi les
          étudiants de la même mention que vous (les SVT avec les SVT, le droit avec le droit). Ce
          classement est découpé en tranches de niveau, chaque tranche prenant la même proportion
          d&apos;étudiants dans chaque discipline.
        </li>
        <li>
          <strong>Dans votre tranche, sur le seul bloc santé.</strong>{" "}Les étudiants d&apos;une
          même tranche, toutes disciplines confondues, sont ensuite départagés sur leurs notes du
          bloc santé.
        </li>
      </ol>
      <p>
        Les tranches s&apos;enchaînent : la tranche 1 occupe le haut de la liste finale, puis vient
        la tranche 2, et ainsi de suite. Selon votre rang et les places disponibles, vous
        choisissez entre médecine, pharmacie, odontologie et maïeutique.
      </p>
      <Figure
        src="/images/blog/lps-classement-par-tranches.webp"
        alt="Schéma : étape 1, classement dans chaque discipline (SVT, droit, STAPS) découpé en tranches ; étape 2, chaque tranche réunit 40 étudiants départagés sur le bloc santé ; liste unique finale des rangs 1 à 400."
        caption="Classement par tranches · exemple fictif, 3 disciplines"
      />

      <h3 id="exemple-chiffre">Un exemple chiffré</h3>
      <p>
        Imaginons une université avec 400 étudiants classés : 200 en SVT, 100 en droit, 100 en
        STAPS, et des tranches de 10 %. Ces chiffres sont fictifs : la proportion réelle sera fixée
        par arrêté. Le détail du calcul est expliqué pas à pas plus bas, juste après l&apos;exemple
        des cinq étudiants.
      </p>
      <ul className="article-list">
        <li>
          La tranche 1 réunit les 20 premiers de SVT, les 10 premiers de droit et les 10 premiers
          de STAPS, soit 40 étudiants. Ils sont classés entre eux sur le bloc santé et occupent les
          rangs 1 à 40.
        </li>
        <li>
          La tranche 2 réunit les 21e à 40e de SVT, et les 11e à 20e de droit et de STAPS. Ils
          occupent les rangs 41 à 80.
        </li>
      </ul>
      <p>Prenons deux étudiants.</p>
      <Table
        head={["", "Léa", "Hugo"]}
        rows={[
          ["Discipline", "SVT", "Droit"],
          ["Rang dans sa discipline, toutes notes", "12e sur 200", "15e sur 100"],
          ["Tranche", "1", "2"],
          ["Moyenne du bloc santé", "13 sur 20", "15 sur 20"],
          ["Rang final", "entre 1 et 40", "entre 41 et 80"]
        ]}
      />
      <p>
        Hugo a une meilleure note en santé, mais il est classé après Léa : sa tranche dépend de son
        rang parmi les étudiants de droit, calculé sur toutes ses notes, santé comprise, et il
        n&apos;est que 15e sur 100. Dans sa tranche, en revanche, sa note de santé lui fera dépasser
        ceux qui ont moins bien réussi le bloc santé.
      </p>
      <p>Deux précisions importantes.</p>
      <ul className="article-list">
        <li>
          <strong>Être en tranche 1 ne garantit pas une place.</strong>{" "}Tout dépend du nombre de
          places de l&apos;université. Si elle en offre moins que l&apos;effectif de la tranche 1,
          une partie de cette tranche ne sera pas admise. Et même admis, le choix entre médecine,
          pharmacie, odontologie et maïeutique se fait selon le rang.
        </li>
        <li>
          <strong>On ne change pas de tranche.</strong>{" "}Dans ce mécanisme, tous les étudiants de la
          tranche 1 sont classés avant ceux de la tranche 2, quelle que soit leur note de santé.
          Dans notre exemple, un étudiant de la tranche 2 finit forcément entre le 41e et le 80e
          rang.
        </li>
      </ul>
      <p>
        Ce qu&apos;il faut retenir :{" "}
        <strong>
          votre rang parmi les étudiants de votre discipline, sur toutes vos notes, fixe votre
          tranche ; le bloc santé vous classe à l&apos;intérieur de cette tranche.
        </strong>{" "}
        Les notes de santé comptent donc deux fois.
      </p>
      <p>
        C&apos;est un vrai changement par rapport au PASS. En PASS, la mineure devait seulement
        être validée et le classement reposait surtout sur les notes de santé : rien
        n&apos;empêchait qu&apos;une grande partie des admis vienne de la même mineure. Avec la
        licence portail santé, chaque discipline envoie la même part de ses étudiants dans chaque
        tranche. Résultat : chaque discipline voit admise à peu près la même proportion de ses
        étudiants classés. En contrepartie, votre premier concurrent est l&apos;étudiant assis à
        côté de vous, dans votre propre discipline.
      </p>

      <h3 id="places">Combien de places pour chaque chance ?</h3>
      <p>
        Le décret ne donne pas de chiffres. Il renvoie à un arrêté qui fixera un{" "}
        <strong>pourcentage maximal</strong>{" "}de places pour la première candidature et un{" "}
        <strong>pourcentage minimal</strong>{" "}pour les passerelles. Un document de travail du
        ministère, publié par L&apos;Etudiant en juin 2026, avançait cette répartition :
      </p>
      <Table
        head={["Voie d'accès", "Part des places (document de travail)"]}
        rows={[
          ["Première chance, en fin de 1re année", "environ 80 %"],
          ["Seconde chance, en fin de 2e année", "environ 20 %"],
          ["Passerelles, à partir de bac+3", "5 %"]
        ]}
      />
      <p>
        Ces chiffres ne sont pas encore officiels. Les 80 % et 20 % se partagent les places de la
        licence portail santé ; les places des passerelles viennent en plus.
      </p>
      <p>
        Un exemple : une université qui ouvre 125 places en 2e année pour la licence portail santé
        en réserverait environ 100 à la première chance, ce qui correspond au scénario A
        ci-dessous, et environ 25 à la seconde chance. La seconde chance n&apos;est donc pas une
        formalité : elle se joue sur un nombre de places beaucoup plus petit.
      </p>

      <h3 id="exemples-pratiques">Exemples pratiques : qui est admis, qui ne l&apos;est pas ?</h3>
      <p>
        Reprenons notre université fictive : 400 étudiants ont validé leur année et sont classés
        (200 en SVT, 100 en droit, 100 en STAPS), répartis en 10 tranches de 40. Tout dépend ensuite
        du nombre de places ouvertes en 2e année pour les étudiants en première candidature.
      </p>
      <Figure
        src="/images/blog/lps-scenarios-de-places.webp"
        alt="Schéma : scénario A avec 100 places, les tranches 1 et 2 sont admises et la limite coupe la tranche 3 ; scénario B avec 30 places, la limite coupe la tranche 1."
        caption="Deux scénarios de places · exemple fictif"
      />
      <p>
        <strong>Scénario A : 100 places.</strong>{" "}Les tranches 1 et 2, soit les rangs 1 à 80, sont
        entièrement admises. Il reste 20 places pour les 40 étudiants de la tranche 3 : les 20
        meilleures notes du bloc santé de cette tranche sont admises, les 20 autres passent en L2.
        À partir de la tranche 4, personne n&apos;est admis cette année.
      </p>
      <p>
        Dans ce scénario, les admis se répartissent ainsi : 40 à 60 en SVT, 20 à 30 en droit, 20 à
        30 en STAPS, selon les notes de santé de la tranche 3. Chaque discipline voit donc admise
        environ un quart de ses étudiants classés.
      </p>
      <p>
        <strong>Scénario B : 30 places.</strong>{" "}Il n&apos;y a pas assez de places pour toute la
        tranche 1. Seuls les 30 étudiants de la tranche 1 qui ont les meilleures notes en santé
        sont admis. Les 10 autres, pourtant parmi les 10 % meilleurs de leur discipline, passent en
        L2.
      </p>

      <h3 id="cinq-etudiants">Cinq étudiants, cinq situations</h3>
      <p>
        Rappel des données de l&apos;exemple : 3 disciplines, 400 étudiants classés (200 en SVT,
        100 en droit, 100 en STAPS). Avec des tranches de 10 %, chaque tranche compte 40 étudiants
        : 20 de SVT, 10 de droit et 10 de STAPS. La tranche 1 occupe les rangs 1 à 40, la tranche 2
        les rangs 41 à 80, et ainsi de suite jusqu&apos;à la tranche 10.
      </p>
      <p>
        Chaque colonne se lit de haut en bas : la discipline et la note de santé, le rang dans la
        discipline, la tranche obtenue, le rang final, puis le résultat selon le nombre de places.
      </p>
      <Figure
        src="/images/blog/lps-cinq-etudiants.webp"
        alt="Schéma : Léa (SVT, 12e sur 200, tranche 1), Hugo (droit, 15e sur 100, tranche 2), Inès (STAPS, 25e sur 100, tranche 3), Tom (SVT, 90e sur 200, tranche 5) et Sarah (droit, discipline non validée, non classée), avec leur résultat selon 100 ou 30 places."
        caption="Cinq étudiants · 3 disciplines, 400 classés, tranches de 40"
      />
      <p>
        Le cas de Tom est le plus contre-intuitif : il a une meilleure note de santé que Léa, Hugo
        et Inès, mais son rang en SVT le place en tranche 5. Il ne peut dépasser personne des
        tranches 1 à 4.
      </p>
      <p>
        Le cas de Sarah rappelle la règle de non-compensation : avec 14 en santé mais un bloc
        disciplinaire non validé, elle n&apos;est pas classée du tout. Si elle a validé le minimum
        de crédits exigé dans chaque bloc, elle peut redoubler ; sinon, elle doit se réorienter.
        Les notes à 10 sur 20 sont prises ici comme seuil de validation habituel en licence ;
        chaque université fixera ses règles.
      </p>

      <h3 id="calcul">Le calcul en détail, pas à pas</h3>
      <p>
        Voici le détail de chaque calcul de l&apos;exemple ci-dessus, sur la même université
        fictive. Tous les chiffres sont des exemples : la proportion réelle d&apos;étudiants par
        tranche sera fixée par arrêté.
      </p>
      <h4>Étape 1 : compter les étudiants classés dans chaque discipline</h4>
      <p>
        Seuls les étudiants qui ont validé leur année sont classés : 60 crédits, avec le bloc santé
        et le bloc disciplinaire validés chacun. Ceux qui n&apos;ont pas validé ne comptent pas
        dans ces effectifs. La formation en soins infirmiers, quand elle est proposée, a son propre
        classement, comme une discipline à part.
      </p>
      <Table
        head={["Discipline", "Étudiants classés"]}
        rows={[
          ["SVT", "200"],
          ["Droit", "100"],
          ["STAPS", "100"],
          ["Total", "400"]
        ]}
      />
      <h4>Étape 2 : calculer la taille d&apos;une tranche</h4>
      <p>On applique la même proportion à chaque discipline. Avec une proportion de 10 % :</p>
      <ul className="article-list">
        <li>
          SVT : 10 % de 200 = <strong>20 étudiants</strong>{" "}par tranche
        </li>
        <li>
          Droit : 10 % de 100 = <strong>10 étudiants</strong>{" "}par tranche
        </li>
        <li>
          STAPS : 10 % de 100 = <strong>10 étudiants</strong>{" "}par tranche
        </li>
      </ul>
      <p>
        Chaque tranche compte donc 20 + 10 + 10 = <strong>40 étudiants</strong>. Avec des tranches
        de 10 %, il y a 100 ÷ 10 = <strong>10 tranches</strong>, et 10 tranches de 40 = 400
        étudiants : tout le monde est placé.
      </p>
      <h4>Étape 3 : répartir chaque discipline dans les tranches</h4>
      <Table
        head={["Tranche", "SVT", "Droit", "STAPS", "Rangs sur la liste finale"]}
        rows={[
          ["1", "1er au 20e", "1er au 10e", "1er au 10e", "1 à 40"],
          ["2", "21e au 40e", "11e au 20e", "11e au 20e", "41 à 80"],
          ["3", "41e au 60e", "21e au 30e", "21e au 30e", "81 à 120"],
          ["4", "61e au 80e", "31e au 40e", "31e au 40e", "121 à 160"],
          ["5", "81e au 100e", "41e au 50e", "41e au 50e", "161 à 200"],
          ["6", "101e au 120e", "51e au 60e", "51e au 60e", "201 à 240"],
          ["7", "121e au 140e", "61e au 70e", "61e au 70e", "241 à 280"],
          ["8", "141e au 160e", "71e au 80e", "71e au 80e", "281 à 320"],
          ["9", "161e au 180e", "81e au 90e", "81e au 90e", "321 à 360"],
          ["10", "181e au 200e", "91e au 100e", "91e au 100e", "361 à 400"]
        ]}
      />
      <h4>Étape 4 : trouver sa propre tranche</h4>
      <p>
        Divisez votre rang dans votre discipline par le nombre d&apos;étudiants de votre discipline
        dans une tranche, puis arrondissez au nombre entier supérieur.
      </p>
      <Table
        head={["Étudiant", "Calcul", "Tranche"]}
        rows={[
          ["Léa, 12e en SVT", "12 ÷ 20 = 0,6, arrondi à 1", "1"],
          ["Hugo, 15e en droit", "15 ÷ 10 = 1,5, arrondi à 2", "2"],
          ["Inès, 25e en STAPS", "25 ÷ 10 = 2,5, arrondi à 3", "3"],
          ["Tom, 90e en SVT", "90 ÷ 20 = 4,5, arrondi à 5", "5"]
        ]}
      />
      <p>
        À la limite : le 20e de SVT fait 20 ÷ 20 = 1, il est encore en tranche 1. Le 21e fait 21 ÷
        20 = 1,05 : il passe en tranche 2.
      </p>
      <h4>Étape 5 : classer les 40 étudiants de la tranche sur le bloc santé</h4>
      <p>
        À l&apos;intérieur d&apos;une tranche, on oublie la discipline et le rang dans la
        discipline : seule compte la moyenne du bloc santé. Voici un extrait fictif des 40
        étudiants de la tranche 1.
      </p>
      <Table
        head={["Étudiant", "Discipline", "Rang dans sa discipline", "Moyenne du bloc santé", "Rang final"]}
        rows={[
          ["Maya", "STAPS", "4e sur 100", "16,2", "1er"],
          ["Paul", "Droit", "9e sur 100", "15,8", "2e"],
          ["Noah", "SVT", "1er sur 200", "15,1", "3e"],
          ["…", "…", "…", "…", "…"],
          ["Léa", "SVT", "12e sur 200", "13,0", "27e"],
          ["…", "…", "…", "…", "…"],
          ["Zoé", "Droit", "2e sur 100", "10,4", "40e"]
        ]}
      />
      <p>Trois choses à remarquer :</p>
      <ul className="article-list">
        <li>
          Noah est 1er de SVT, mais seulement 3e de la tranche : d&apos;autres ont fait mieux que lui
          en santé.
        </li>
        <li>
          Zoé est 2e de droit grâce à d&apos;excellentes notes dans sa discipline, mais elle finit
          40e de la tranche avec 10,4 en santé.
        </li>
        <li>
          Zoé reste pourtant devant tous les étudiants de la tranche 2, qui commencent au rang 41,
          même ceux qui ont 17 en santé.
        </li>
      </ul>
      <p>
        Si deux étudiants ont exactement la même moyenne, ils sont départagés par des coefficients
        appliqués à certaines notes, fixés par arrêté.
      </p>
      <h4>Étape 6 : appliquer le nombre de places</h4>
      <p>
        Pour savoir jusqu&apos;où descendent les admissions, divisez le nombre de places par la
        taille d&apos;une tranche.
      </p>
      <ul className="article-list">
        <li>
          <strong>Scénario A, 100 places</strong>{" "}: 100 ÷ 40 = 2,5. Les tranches 1 et 2 sont
          entièrement admises, soit 80 places. Les 20 places restantes vont aux 20 meilleures
          moyennes de santé de la tranche 3.
        </li>
        <li>
          <strong>Scénario B, 30 places</strong>{" "}: 30 ÷ 40 = 0,75. Seuls les 30 premiers de la
          tranche 1 sont admis. Léa, 27e de la tranche, est admise ; le 31e de la tranche ne
          l&apos;est pas.
        </li>
      </ul>
      <p>Dans le scénario A, voici la répartition des admis par discipline.</p>
      <Table
        head={["Discipline", "Tranches 1 et 2", "Tranche 3 (20 places pour 40 étudiants)", "Total admis", "Part des classés admis"]}
        rows={[
          ["SVT", "40", "entre 0 et 20", "entre 40 et 60", "20 % à 30 %"],
          ["Droit", "20", "entre 0 et 10", "entre 20 et 30", "20 % à 30 %"],
          ["STAPS", "20", "entre 0 et 10", "entre 20 et 30", "20 % à 30 %"],
          ["Total", "80", "20", "100", "25 %"]
        ]}
      />
      <p>
        La tranche 3 se partage selon les notes de santé : si les étudiants de SVT y réussissent
        mieux le bloc santé, ils prennent davantage de ces 20 places.
      </p>
      <h4>Et si une discipline est plus petite ?</h4>
      <p>
        Ajoutons une licence de psychologie avec 30 étudiants classés. 10 % de 30 = 3 : elle envoie
        3 étudiants dans chaque tranche, et chaque tranche passe à 43 étudiants (20 + 10 + 10 + 3).
        Une petite discipline n&apos;est ni avantagée ni pénalisée : ses 3 meilleurs sont en tranche
        1, exactement comme les 20 meilleurs de SVT.
      </p>
      <h4>Et quand le calcul ne tombe pas juste ?</h4>
      <p>
        Avec 105 étudiants classés en droit, 10 % donne 10,5 étudiants par tranche. La façon
        d&apos;arrondir sera précisée par l&apos;arrêté ; elle n&apos;est pas encore connue.
      </p>

      <h3 id="choix-filiere">Et le choix de la filière ?</h3>
      <p>
        Les admis choisissent leur filière dans l&apos;ordre du classement, dans la limite des
        places de chaque filière. Imaginons, dans le scénario A, 60 places en médecine, 20 en
        pharmacie, 10 en odontologie et 10 en maïeutique.
      </p>
      <ul className="article-list">
        <li>Le 1er choisit en premier, le 100e en dernier.</li>
        <li>
          Si les 60 premiers choisissent tous médecine, Hugo, classé par exemple 70e, ne trouve plus
          de place en médecine. Il choisit entre pharmacie, odontologie et maïeutique, selon ce qui
          reste.
        </li>
        <li>
          Être admis ne garantit donc pas la filière de son choix : plus le rang est bon, plus le
          choix est large.
        </li>
      </ul>

      <h3 id="seconde-chance">La seconde chance, en pratique</h3>
      <p>
        Tom poursuit en L2 de SVT. À la fin de sa L2, s&apos;il obtient 60 crédits supplémentaires
        dans la même discipline, il est classé sur une nouvelle liste, celle de la deuxième année,
        construite de la même façon : tranches par discipline, puis bloc santé.
      </p>
      <p>Dans cette seconde liste, le décret fixe deux priorités :</p>
      <ul className="article-list">
        <li>
          ceux qui avaient validé leurs blocs de 1re année en première session passent avant ceux
          qui les avaient validés au rattrapage ;
        </li>
        <li>
          les étudiants qui ont redoublé leur 1re année passent après ceux qui n&apos;ont pas
          redoublé.
        </li>
      </ul>
      <p>
        Le nombre de places réservées à cette seconde candidature sera fixé par arrêté ; un
        document de travail du ministère évoque environ 20 % des places de la licence portail
        santé. C&apos;est la dernière chance par la licence portail santé.
      </p>

      <h3 id="redoublement">Le redoublement, en pratique</h3>
      <p>
        Karim n&apos;a pas validé son année, mais il a obtenu le minimum de crédits exigé dans le
        bloc santé et dans le bloc disciplinaire. Il peut redoubler, une seule fois, dans la même
        discipline. Selon le projet d&apos;arrêté présenté en juillet 2026, ce minimum serait de 70
        % des crédits de chaque bloc : avec un bloc santé de 30 crédits, il lui faudrait au moins
        21 crédits en santé ; avec un bloc disciplinaire de 24 crédits, au moins 16,8 crédits. Le
        bloc transversal ne compte pas pour cette règle.
      </p>
      <ul className="article-list">
        <li>
          Même s&apos;il termine en tranche 1 à l&apos;issue de son année redoublée, il ne peut pas
          candidater cette année-là, sauf dérogation du président de l&apos;université pour
          circonstances exceptionnelles.
        </li>
        <li>
          Il passe alors en L2 et candidate en fin de L2, classé après les étudiants qui n&apos;ont
          pas redoublé.
        </li>
        <li>En pratique, sa seule chance par cette voie arrive trois ans après son bac.</li>
      </ul>
      <p>
        Le redoublement sert donc à consolider son année, pas à retenter immédiatement la santé.
      </p>

      <h2 id="quatre-issues">En fin de première année : les quatre issues possibles</h2>
      <Figure
        src="/images/blog/lps-issues-fin-premiere-annee.webp"
        alt="Schéma : année validée et rang suffisant, admis en 2e année ; année validée et rang insuffisant, poursuite en L2 ; année non validée avec le minimum de crédits, redoublement ; minimum non atteint, réorientation."
        caption="Fin de première année de LPS · 3 questions, 4 issues"
      />
      <p>
        Tout se joue en deux temps : d&apos;abord la validation de l&apos;année, ensuite le rang.
        Seule la première issue mène directement en filière santé ; la deuxième conserve une
        seconde chance en fin de 2e année.
      </p>
      <Table
        head={["Votre résultat", "Ce qui se passe"]}
        rows={[
          [
            "Année validée et rang suffisant",
            "Vous entrez en 2e année de médecine, pharmacie, odontologie ou maïeutique, selon votre rang et les places."
          ],
          [
            "Année validée, rang insuffisant",
            "Vous passez en 2e année de votre licence, ou de la formation en soins infirmiers. Vous pourrez candidater une seconde et dernière fois à la fin de cette 2e année, avec 60 crédits supplémentaires."
          ],
          [
            "Année non validée, minimum de crédits atteint dans chaque bloc",
            "Vous pouvez redoubler une seule fois, dans la même discipline. L'année redoublée n'ouvre pas de candidature en santé, et vous serez ensuite classé après les non-redoublants."
          ],
          [
            "Année non validée, minimum non atteint",
            "Le redoublement n'est pas possible : vous vous réorientez."
          ]
        ]}
      />
      <p>
        Le seuil de crédits qui autorise le redoublement sera fixé par arrêté. Le projet présenté
        en juillet 2026 prévoyait{" "}
        <strong>70 % des crédits du bloc santé et 70 % des crédits du bloc disciplinaire</strong>,
        le bloc transversal ne comptant pas. Avec un bloc santé de 30 crédits, il faudrait donc en
        avoir validé au moins 21. Ce chiffre reste à confirmer.
      </p>

      <h2 id="cas-par-cas">Votre situation, cas par cas</h2>

      <h3 id="terminale">Vous êtes en terminale (bac 2027) ou en première</h3>
      <p>
        Vous êtes la première génération concernée. Vous candidaterez en licence portail santé sur
        Parcoursup, en choisissant une université et une discipline. Ce choix compte double :
        c&apos;est la discipline qu&apos;il faudra valider pour être classé, et celle que vous
        poursuivrez en 2e année si vous n&apos;accédez pas tout de suite à une filière santé.
      </p>

      <h3 id="pass">Vous êtes en PASS cette année</h3>
      <p>
        Rien ne change pour vous. Vous restez dans le système actuel jusqu&apos;à la fin de
        l&apos;année 2028-2029. Le redoublement du PASS reste interdit. Si vous n&apos;êtes pas
        admis cette année, votre seconde chance passe par une LAS 2 ou une LAS 3 : les universités
        doivent maintenir ces années en 2027-2028 et 2028-2029.
      </p>

      <h3 id="las">Vous êtes en LAS 1, LAS 2 ou LAS 3</h3>
      <p>
        Vos chances sont préservées. Un étudiant entré en LAS en septembre 2026 peut candidater en
        fin de L1, de L2 ou de L3 selon les règles de son université, puisque sa troisième année se
        termine en 2029. Les places qui vous sont réservées doivent être fixées pour vous offrir les
        mêmes chances qu&apos;en 2026-2027.
      </p>
      <p>
        Attention à la date butoir : après 2028-2029, plus aucune candidature n&apos;est possible
        au titre de l&apos;ancien parcours. Si votre cursus risque de se décaler (redoublement,
        interruption), parlez-en dès maintenant à votre scolarité.
      </p>

      <h3 id="deja-fait">
        Vous avez déjà fait un PASS, une LAS ou une PACES et vous pensiez repartir en LPS
      </h3>
      <p>
        En principe, ce n&apos;est pas possible. Le décret prévoit trois exceptions : une année de
        césure ou un service national, une interruption pour motif exceptionnel admise par le
        président de l&apos;université, ou une première année aménagée. Les anciens étudiants de
        PACES ne peuvent pas candidater au titre de la licence portail santé.
      </p>

      <h3 id="licence">Vous êtes en licence, sans option santé</h3>
      <p>
        Une porte s&apos;ouvre pour vous. La réforme crée une passerelle pour les titulaires
        d&apos;une licence, même sans être passés par la licence portail santé. La sélection se
        fait sur dossier puis audition, avec deux candidatures au maximum, pour une admission en 2e
        ou en 3e année. Le calendrier et le contenu du dossier seront précisés par arrêté.
      </p>
      <p>
        Autre possibilité : vous inscrire en licence portail santé via Parcoursup, comme un lycéen,
        si l&apos;offre de l&apos;université le permet. Une condition : ne pas avoir déjà obtenu 60
        crédits dans une licence de la même mention que celle choisie. Par exemple, après une L1 de
        droit validée, vous ne pouvez pas choisir la licence portail santé mention droit, mais une
        autre mention reste possible. Cette règle ne concerne pas les étudiants déjà passés par un
        PASS ou une LAS, pour qui l&apos;inscription en LPS est fermée.
      </p>

      <h3 id="infirmier-medecine">Vous visez à la fois infirmier et médecine</h3>
      <p>
        C&apos;est une nouveauté : le bloc disciplinaire de la licence portail santé peut être la
        formation en soins infirmiers, lorsque l&apos;université a signé une convention avec un
        IFSI. Si vous validez votre année sans accéder à une filière santé, vous poursuivez en 2e
        année de formation en soins infirmiers, parfois après avoir validé des crédits ou des
        stages complémentaires, et vous pouvez candidater une seconde fois à l&apos;issue de cette
        2e année. L&apos;offre réelle de chaque université sera connue à l&apos;ouverture de
        Parcoursup.
      </p>

      <h3 id="diplome-sante">
        Vous êtes infirmier, kinésithérapeute ou diplômé d&apos;une autre profession de santé
      </h3>
      <p>
        Vous relevez de la voie passerelle, ouverte aux titulaires d&apos;un diplôme permettant
        d&apos;exercer une profession de santé : dossier, audition, deux candidatures au maximum.
      </p>

      <h3 id="ifsi">Vous êtes étudiant en IFSI</h3>
      <p>
        <strong>Ce que signifie « voie d&apos;accès ».</strong>{" "}Dans le système actuel, trois
        parcours permettent de candidater en 2e année de médecine, pharmacie, odontologie ou
        maïeutique : le PASS, la LAS, et les formations paramédicales d&apos;au moins trois ans
        menant à un diplôme d&apos;État, comme les soins infirmiers. Concrètement, un étudiant
        infirmier peut candidater <strong>pendant sa formation, sans attendre son diplôme</strong>,
        dès qu&apos;il a validé une ou deux années. Chaque université fixe les modalités (instituts
        concernés, dossier, épreuves), et deux candidatures au maximum sont possibles.
      </p>
      <p>
        <strong>Si vous êtes entré en IFSI avant la rentrée 2027</strong>, ces règles restent
        valables pour vous jusqu&apos;à la fin de l&apos;année 2028-2029, avec des places fixées
        pour vous garder les mêmes chances qu&apos;en 2026-2027. Exemple : Clara entre en IFSI en
        septembre 2026. Si elle valide sa 1re année en juin 2027, elle peut candidater pendant
        l&apos;année 2027-2028, puis une seconde fois en 2028-2029, après sa 2e année. Après
        2028-2029, cette voie se ferme : il lui restera la passerelle, une fois son diplôme
        d&apos;infirmière obtenu.
      </p>
      <p>
        <strong>Vous avez fait un PASS, puis vous êtes passé en IFSI ?</strong>{" "}Attention au
        compteur de candidatures. Dans l&apos;ancien système, l&apos;inscription en PASS compte déjà
        pour une candidature, que l&apos;on soit admis ou non. Exemple : Inès a fait un PASS en
        2025-2026 et est en 1re année d&apos;IFSI en 2026-2027. Si elle valide son année en juin
        2027, elle peut candidater par la voie paramédicale selon les modalités de son université,
        mais ce sera sa seconde et dernière candidature. Si elle n&apos;est pas admise, il lui
        restera la passerelle, après son diplôme d&apos;infirmière.
      </p>
      <p>
        <strong>
          Vous ne pouvez pas vous inscrire en licence portail santé, quelle que soit la discipline.
        </strong>{" "}
        Le décret ferme la LPS aux étudiants qui ont commencé l&apos;un des anciens parcours avant
        2027 : PASS, LAS ou formation paramédicale. L&apos;interdiction vise la licence portail
        santé dans son ensemble, pas seulement le bloc soins infirmiers : une LPS mention SVT ou
        droit vous est aussi fermée. Il n&apos;y a que trois exceptions : une année de césure ou un
        service national, une interruption de formation pour motif exceptionnel admise par le
        président de l&apos;université, ou une première année aménagée. Vous pouvez en revanche
        utiliser Parcoursup pour toute autre formation, une licence classique par exemple.
      </p>
      <p>
        Ce point découle de la lecture du décret, et chaque université précise quels instituts
        relèvent de cette voie. Avant toute décision, faites-le confirmer par la scolarité de
        l&apos;université ou par votre IFSI.
      </p>
      <p>
        <strong>Si vous entrez en IFSI à partir de la rentrée 2027</strong>, la candidature en
        cours d&apos;études paramédicales disparaît : elle n&apos;existe plus dans le nouveau texte.
        Pour viser la médecine, il reste deux voies : la licence portail santé avec le bloc soins
        infirmiers, si l&apos;université le propose, ou la passerelle après le diplôme d&apos;État.
      </p>

      <h3 id="europe">Vous étudiez la santé dans un autre pays européen</h3>
      <p>
        Les titulaires d&apos;un diplôme obtenu dans l&apos;Union européenne, l&apos;Espace
        économique européen, en Suisse ou en Andorre, justifiant d&apos;au moins 180 crédits,
        peuvent candidater en 2e ou en 3e année, sur dossier puis audition.
      </p>

      <h3 id="kine">Vous visez la kinésithérapie</h3>
      <p>
        C&apos;est le point le moins stabilisé de la réforme. Le décret du 23 octobre ne concerne
        que la médecine, la pharmacie, l&apos;odontologie et la maïeutique : l&apos;entrée en
        institut de kinésithérapie (IFMK) dépend d&apos;autres textes, qui n&apos;ont pas encore été
        adaptés. Le 27 octobre, les fédérations étudiantes, dont celle des étudiants en
        kinésithérapie, ont demandé leur publication sans délai.
      </p>
      <p>Ce que l&apos;on sait aujourd&apos;hui :</p>
      <ul className="article-list">
        <li>
          <strong>
            Les ministères annoncent que la licence portail santé deviendra « à terme » la voie
            d&apos;accès à la kinésithérapie
          </strong>
          , sans date précise.
        </li>
        <li>
          <strong>Pour la rentrée 2027, l&apos;Onisep indique deux voies</strong>{" "}: une première
          année de licence portail santé, ou une licence de biologie, de STAPS ou de sciences,
          technologies, santé qui ouvre un accès kiné. Toutes ces licences ne le permettent pas :
          l&apos;accès dépend d&apos;une convention entre l&apos;université et un institut.
        </li>
        <li>
          <strong>Ces autres voies doivent disparaître progressivement d&apos;ici 2029</strong>,
          selon la fédération des étudiants en kinésithérapie et L&apos;Etudiant.
        </li>
      </ul>
      <p>
        Notre conseil : si vous visez la kiné, vérifiez sur Parcoursup, à partir du 17 décembre,
        que la formation choisie indique bien un accès aux études de kinésithérapie, et à quel
        institut elle est rattachée.
      </p>

      <h2 id="dates">Les dates à retenir</h2>
      <Table
        head={["Date", "Étape"]}
        rows={[
          [
            "17 décembre 2026",
            "Ouverture de la carte des formations Parcoursup : disciplines et places proposées par chaque université"
          ],
          ["18 janvier au 11 mars 2027", "Formulation des vœux sur Parcoursup"],
          ["Septembre 2027", "Première rentrée en licence portail santé"],
          [
            "Fin de l'année 2028-2029",
            "Dernières candidatures possibles pour les étudiants entrés en PASS ou en LAS"
          ]
        ]}
      />

      <h2 id="a-preciser">Ce qui reste à préciser</h2>
      <p>
        Le décret pose le cadre, mais renvoie de nombreux détails à un arrêté qui n&apos;est pas
        encore paru à la date de cet article. Sont notamment attendus :
      </p>
      <ul className="article-list">
        <li>la liste des mentions de licence possibles pour le bloc disciplinaire ;</li>
        <li>la taille des tranches de niveau et les coefficients qui départagent les ex aequo ;</li>
        <li>
          le nombre minimal de crédits à valider pour avoir le droit de redoubler (70 % de chaque
          bloc selon le projet de juillet) ;
        </li>
        <li>
          la répartition des places entre première candidature, seconde candidature et passerelles
          (environ 80 %, 20 % et 5 % selon un document de travail) ;
        </li>
        <li>les modalités pratiques des passerelles (dossier, calendrier, auditions).</li>
      </ul>
      <p>
        Le calendrier fait aussi débat. Les doyens des facultés de santé ont demandé un report de
        la réforme à 2028 et alertent sur une possible baisse du nombre de places en première
        année. À ce jour, le gouvernement maintient la rentrée 2027.
      </p>
      <p>
        Pour la Guadeloupe, l&apos;offre de l&apos;Université des Antilles sera connue à
        l&apos;ouverture de la carte des formations Parcoursup, le 17 décembre. Nous mettrons cet
        article à jour dès la parution de l&apos;arrêté et de cette offre.
      </p>

      <h2 id="conseils">Nos conseils</h2>
      <p>
        <strong>Si vous êtes lycéen.</strong>{" "}Choisissez une discipline dans laquelle vous pouvez
        réussir : sans compensation entre les blocs, elle pèse autant que la santé dans votre
        admission. Consolidez vos bases scientifiques dès maintenant, car le bloc santé départage
        les candidats.
      </p>
      <p>
        <strong>Si vous êtes en PASS ou en LAS.</strong>{" "}Ne changez pas de stratégie.
        Concentrez-vous sur votre année : c&apos;est elle qui compte, et vos droits sont maintenus.
      </p>
      <p>
        <strong>Si vous êtes en licence ou déjà diplômé.</strong>{" "}Surveillez la parution de
        l&apos;arrêté sur les passerelles et soignez dès maintenant votre dossier universitaire.
      </p>
      <p>
        <strong>Dans tous les cas.</strong>{" "}La première année reste très sélective. La méthode de
        travail, la régularité et l&apos;entraînement en conditions réelles font la différence,
        quel que soit le nom du parcours.
      </p>
      <p>
        <strong>Pourquoi se faire accompagner devient encore plus nécessaire.</strong>{" "}Avec la
        licence portail santé, il ne suffit plus de réussir la santé. Il faut réussir sa discipline
        pour décrocher une bonne tranche, puis le bloc santé pour se classer dans cette tranche, le
        tout dès la première session et sans compensation possible. Le choix de la discipline,
        l&apos;organisation entre deux programmes et la régularité dès le premier semestre
        deviennent décisifs. Dans ce nouveau système, un accompagnement personnalisé, adapté à
        votre discipline et à votre profil, sera la clé de la réussite.
      </p>

      <h2 id="lexique">Annexe : petit lexique</h2>
      <Table
        head={["Mot", "Ce qu'il veut dire"]}
        rows={[
          ["Crédits (ECTS)", "Unités qui mesurent le travail d'une année d'études. Une année complète vaut 60 crédits."],
          ["Mention", "La discipline de licence choisie avec la licence portail santé : SVT, droit, STAPS, psychologie…"],
          ["Bloc", "Un groupe d'enseignements. La LPS en compte trois : santé, disciplinaire et transversal."],
          ["Valider un bloc", "Obtenir les crédits de ce bloc, selon les règles d'examen de l'université."],
          ["Compensation", "Le fait qu'une bonne note rattrape une mauvaise. Elle est interdite entre le bloc santé et le bloc disciplinaire."],
          ["Première session", "Les examens organisés normalement pendant l'année. Ce sont leurs notes qui servent au classement."],
          ["Rattrapage (seconde session)", "La seconde chance d'examen pour ceux qui n'ont pas validé en première session."],
          ["Classement partiel", "Le classement des étudiants d'une même discipline, sur toutes leurs notes."],
          ["Tranche de niveau", "Un groupe d'étudiants de même niveau, avec la même proportion d'étudiants de chaque discipline."],
          ["Liste unique", "Le classement final, toutes disciplines confondues, qui décide des admissions et de l'ordre de choix des filières."],
          ["Candidature", "Une tentative d'accès en 2e année. La LPS en permet deux au maximum : en fin de 1re année et en fin de 2e année."],
          ["Capacité d'accueil", "Le nombre de places ouvertes en 2e année, fixé par chaque université selon les besoins de santé du territoire."],
          ["Passerelle", "Un accès direct en 2e ou 3e année, sur dossier puis audition, pour certains diplômés."],
          ["MMOP", "Médecine, maïeutique (sage-femme), odontologie (chirurgie dentaire) et pharmacie."]
        ]}
      />

      <aside className="article-callout" aria-labelledby="encadre-dispositif">
        <h2 id="encadre-dispositif">
          Un accompagnement gratuit, sous conditions, réservé aux étudiants boursiers éligibles
        </h2>
        <p>
          L&apos;AGMS propose en Guadeloupe un dispositif d&apos;accompagnement vers les études de
          santé, cofinancé par l&apos;Union européenne (FSE+). L&apos;éligibilité est étudiée au cas
          par cas par notre équipe.
        </p>
        <p>
          <strong>Pré-inscriptions ouvertes.</strong>{" "}La demande d&apos;inscription se fait en
          ligne, gratuitement et sans pièce justificative : découvrez comment elle se déroule, puis
          déposez la vôtre.
        </p>
        <div className="section-actions">
          <Link className="button button--primary" href={site.inscriptionUrl}>
            Comment s&apos;inscrire
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <p>Pour savoir si vous pouvez en bénéficier, écrivez-nous :</p>
        <div className="contact-list">
          <a href={`mailto:${site.email}`}>
            <Mail size={19} aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </aside>

      <h2 id="sources">Sources</h2>
      <p>Article rédigé à partir des textes et analyses disponibles au 12 novembre 2026.</p>
      <ul className="article-sources">
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
            {source.publisher ? `, ${source.publisher}` : null}
          </li>
        ))}
      </ul>
    </>
  );
}
