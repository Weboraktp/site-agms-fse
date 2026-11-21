/** Espace étudiant en ligne (plateforme de cours, QCM, forum et agenda). */
export const espaceEtudiantUrl = "https://espace.coursmedical.fr";

/** Prépa Cours Médical, ouverte à tous : l'inscription y passe par un dossier en ligne. */
export const coursMedical = {
  name: "Cours Médical",
  url: "https://coursmedical.fr",
  inscriptionUrl: "https://coursmedical.fr/inscription"
};

/** Article de fond sur la réforme : la licence portail santé remplace le PASS et la LAS en 2027. */
export const reformArticleUrl = "/blog/fin-pass-las-2027-licence-portail-sante";

export const site = {
  name: "AGMS — Dispositif FSE+ PASS/LAS",
  shortName: "Dispositif FSE+ AGMS",
  agms: "AGMS — Association Guadeloupéenne du Médico-Social",
  email: "contact@dispositif-agms.fr",
  emailLabel: "contact@dispositif-agms.fr",
  phones: ["06 90 76 65 38", "06 90 07 47 46"],
  address: "22 rue Ferdinand Forest, Jarry, 97122 Baie-Mahault",
  /** Page « Comment s'inscrire » : les deux voies, les étapes, la FAQ. */
  inscriptionUrl: "/inscription",
  /** Dossier de demande d'inscription en ligne (gratuit, sans pièce justificative). */
  candidatureUrl: "/pre-inscription",
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Le projet", href: "/projet" },
    { label: "Accompagnement", href: "/accompagnement" },
    { label: "Salon santé", href: "/salon" },
    { label: "Comment s'inscrire", href: "/inscription" },
    { label: "Demande d'inscription", href: "/pre-inscription" },
    { label: "Recrutement", href: "/recrutement" },
    { label: "Contact", href: "/contact" }
  ]
};

export const whyProjectText =
  "La Guadeloupe est confrontée à des situations de décrochage scolaire et de désengagement qui pèsent sur l'égalité des chances, l'orientation et l'insertion des jeunes. Le projet FSE+ de l'AGMS agit sur ces freins en reliant information, motivation, découverte des métiers de la santé et accompagnement pédagogique renforcé pour les étudiants engagés dans une première année de santé (licence portail santé à partir de la rentrée 2027, PASS et LAS jusque-là).";

export const projectSummary =
  "Le projet vise à prévenir le décrochage scolaire et universitaire, renforcer l'égalité des chances et aider les jeunes guadeloupéens à construire un parcours d'orientation cohérent dans les métiers de la santé.";

export const projectCards = [
  {
    icon: "School",
    title: "Orientation des lycéens",
    text: "Interventions auprès des élèves de Première et Terminale, information sur la licence portail santé (PASS et LAS jusqu'en 2026), Parcoursup et les métiers de la santé."
  },
  {
    icon: "GraduationCap",
    title: "Accompagnement en première année de santé",
    text: "Cours de soutien ciblés, ED en petits groupes, colles, QCM, suivi individualisé et cadre de travail en présentiel."
  },
  {
    icon: "Clock",
    title: "Révisions et méthodologie",
    text: "Organisation, planification, mémorisation active, révisions et consolidation des matières clés."
  },
  {
    icon: "Stethoscope",
    title: "Salon des métiers de la santé",
    text: "Témoignages, ateliers, démonstrations, stands d'information et échanges avec les acteurs de santé et de formation."
  }
];

export const keyFigures = [
  "20 places disponibles",
  "100 % gratuit sous conditions pour les étudiants éligibles sélectionnés",
  "Jusqu'à 192h d'accompagnement possible sur l'année",
  "Interventions auprès des élèves de Première et Terminale",
  "Organisation d'un salon des métiers de la santé",
  "Salle de travail dédiée et accompagnement en présentiel à Jarry"
];

export const impactStats = [
  {
    value: "2",
    label: "voies possibles",
    detail: "gratuite sous conditions ou payante ouverte à tous"
  },
  {
    value: "5 min",
    label: "pour votre demande",
    detail: "dossier en ligne, gratuit, sans pièce justificative"
  },
  {
    value: "20",
    label: "places réservées",
    detail: "dans le dispositif gratuit sous conditions"
  },
  {
    value: "2027",
    label: "licence portail santé",
    detail: "elle remplace le PASS et la LAS à la rentrée"
  }
];

export const orientationSteps = [
  {
    title: "Vous déposez votre demande d'inscription",
    text: "Un dossier en ligne d'environ 5 minutes, gratuit, sans pièce justificative à ce stade."
  },
  {
    title: "L'équipe étudie votre éligibilité",
    text: "L'équipe AGMS examine votre situation (bourse, mention au bac, parcours) et vous recontacte pour échanger."
  },
  {
    title: "On confirme la voie adaptée",
    text: "Dispositif gratuit sous conditions si vous êtes éligible, ou accompagnement payant ouvert à tous avec Cours Médical, hors dispositif gratuit."
  }
];

export const freePathText =
  "Le dispositif gratuit sous conditions est réservé aux étudiants éligibles sur critères sociaux et pédagogiques, notamment la situation de bourse, le dossier scolaire, les résultats au bac, l'entretien et l'admission en licence portail santé, dans la limite des 20 places disponibles.";

export const openPathText =
  "Vous n'êtes pas boursier·ère, ou pas éligible au dispositif gratuit sous conditions ? Un accompagnement payant ouvert à tous existe avec Cours Médical, hors dispositif gratuit et selon ses propres modalités. Votre demande d'inscription permet de vous orienter vers la réponse la plus adaptée.";

export const accessModes = [
  {
    icon: "ShieldCheck",
    title: "Dispositif gratuit sous conditions",
    text:
      "Voie réservée aux étudiants éligibles sur critères sociaux et pédagogiques : bourse ou situation sociale, dossier, résultats au bac, entretien, admission en licence portail santé, dans la limite des 20 places disponibles."
  },
  {
    icon: "GraduationCap",
    title: "Accompagnement payant ouvert à tous",
    text:
      "Pour les étudiants qui ne relèvent pas du dispositif gratuit sous conditions, une voie payante peut être proposée avec Cours Médical, hors financement FSE+ et selon ses modalités propres."
  }
];

export const methodPillars = [
  {
    icon: "Lightbulb",
    title: "Organisation & planification",
    text: "Emploi du temps réaliste, priorisation des matières et répartition progressive de la charge de travail."
  },
  {
    icon: "Brain",
    title: "Mémorisation efficace",
    text: "Techniques de mémorisation active, répétition espacée, entraînement régulier et usage raisonné des outils numériques."
  },
  {
    icon: "HeartHandshake",
    title: "Suivi personnalisé",
    text: "Ajustements réguliers selon les difficultés, les résultats obtenus et le rythme de progression de l'étudiant."
  },
  {
    icon: "ShieldCheck",
    title: "Gestion du stress & régularité",
    text: "Repères pour tenir sur la durée, éviter le décrochage et aborder les évaluations avec stabilité."
  },
  {
    icon: "Users",
    title: "Petits groupes",
    text: "Groupes à effectif réduit pour garder un cadre lisible, humain et proche des besoins réels des étudiants."
  },
  {
    icon: "School",
    title: "Tuteurs qualifiés",
    text: "Encadrement par des étudiants tuteurs ayant réussi leur première année de santé, avec une transmission concrète des méthodes."
  }
];

export const projectObjectives = [
  "Accompagner les étudiants en première année de santé afin de maximiser leurs chances de réussite et de classement",
  "Informer et sensibiliser les lycéens aux métiers de la santé et aux parcours de formation",
  "Aider les jeunes à se projeter dans un projet d'orientation réaliste et motivant",
  "Renforcer les compétences académiques nécessaires aux filières scientifiques et de santé",
  "Accompagner l'autonomie des étudiants dans la transition vers l'université",
  "Réduire les situations de décrochage, d'isolement ou de désengagement scolaire"
];

export const candidateSteps = [
  {
    step: "01",
    title: "Je dépose ma demande d'inscription",
    text: "L'étudiant ou sa famille remplit le dossier en ligne, gratuit et sans pièce justificative à ce stade."
  },
  {
    step: "02",
    title: "L'équipe vérifie l'éligibilité",
    text: "Le dossier est étudié selon la situation sociale, la bourse, les résultats au bac, le parcours, la motivation et l'admission en licence portail santé."
  },
  {
    step: "03",
    title: "Un entretien positionne le besoin",
    text: "L'échange permet d'identifier les difficultés, les objectifs et le niveau d'accompagnement adapté."
  },
  {
    step: "04",
    title: "L'accompagnement démarre",
    text: "Les étudiants sélectionnés rejoignent le dispositif dans la limite des 20 places disponibles."
  }
];

export const fseTexts = {
  intro:
    "Le Fonds Social Européen Plus, ou FSE+, est un programme de l'Union européenne destiné à soutenir l'emploi, la formation, l'inclusion sociale, l'égalité des chances et la réussite éducative. En Guadeloupe, le FSE+ contribue à financer des projets ayant un impact social concret sur le territoire.",
  support:
    "Le lancement du projet AGMS s'inscrit dans le Programme FEDER-FSE+ Guadeloupe 2021-2027, autour de la réussite éducative, de la lutte contre le décrochage universitaire et de l'orientation des élèves, étudiants et familles.",
  caution:
    "L'accès au dispositif reste soumis à l'éligibilité, à la sélection des dossiers et à la limite des 20 places disponibles."
};

export const agmsText =
  "L'AGMS — Association Guadeloupéenne du Médico-Social — est une structure implantée à Jarry, Baie-Mahault. Elle intervient dans le champ de la formation, de l'accompagnement et du médico-social. À travers ce projet, l'AGMS souhaite mettre son expérience au service de la réussite éducative, de l'orientation des jeunes et de l'égalité des chances dans l'accès aux études de santé.";

export const projectFrame = [
  {
    title: "Le cadre FSE+",
    label: "Lancement du projet",
    text:
      "Le dispositif est lancé dans le cadre du FSE+. Ce cadre européen permet de soutenir une action concrète contre le décrochage scolaire et universitaire, avec une attention portée à l'orientation, à la motivation et à la réussite éducative.",
    note: "Sous réserve d'éligibilité, de sélection et dans la limite des 20 places disponibles."
  },
  {
    title: "Le rôle de l'AGMS",
    label: "Portage local",
    text:
      "L'AGMS porte le projet sur le territoire, accueille le dispositif dans ses locaux de Jarry et coordonne l'accompagnement des étudiants en première année de santé avec ses équipes et ses intervenants.",
    note: "Un ancrage local pour accompagner les jeunes guadeloupéens vers les études de santé."
  }
];

export const localDetails = [
  "Adresse : 22 rue Ferdinand Forest, Jarry, 97122 Baie-Mahault",
  "Espace d'environ 270 m2 avec quatre salles, cinq bureaux, une cafétéria et des espaces de travail",
  "Accompagnement en présentiel"
];

export const accompanimentText =
  "L'accompagnement en première année de santé reprend une organisation pédagogique complète : préparation annuelle, cours de soutien ciblés, enseignements dirigés en petits groupes, colles hebdomadaires corrigées, QCM réguliers, suivi personnalisé et méthodologie rigoureuse. Il s'adapte à la licence portail santé dès la rentrée 2027, et continue d'accompagner les étudiants actuels en PASS et en LAS. Dans le cadre FSE+, la voie gratuite sous conditions est réservée aux étudiants éligibles sélectionnés selon des critères sociaux et pédagogiques. Si l'étudiant n'est pas éligible, une voie payante ouverte à tous peut être proposée avec Cours Médical, hors dispositif gratuit.";

export const accompanimentFeatures = [
  "Préparation annuelle en première année de santé",
  "Cours de soutien ciblés",
  "Enseignements dirigés en présentiel",
  "TD / ED en petits groupes",
  "Colles hebdomadaires corrigées",
  "QCM hebdomadaires par matière",
  "QCM intégrés aux colles et aux ED",
  "Annales et examens blancs",
  "Organisation & planification",
  "Mémorisation efficace",
  "Suivi personnalisé",
  "Gestion du stress & régularité",
  "Tuteurs qualifiés",
  "Salle de travail dédiée et encadrée",
  "BU virtuelle",
  "Cadre de travail en présentiel à Jarry"
];

export const stageRentreeText =
  "Le stage de rentrée vient de se dérouler dans les locaux de l'AGMS à Jarry. Pendant une semaine, les étudiants ont découvert le fonctionnement de PASS/LAS matière par matière, construit leur emploi du temps, travaillé leurs méthodes de travail et abordé la gestion du stress, en présentiel et en petit groupe. Un premier temps fort avant le démarrage de l'année, pensé pour arriver à la rentrée avec des repères clairs et davantage de confiance.";

export const stageRentreeHighlights = [
  "La présentation détaillée des matières",
  "Le cours sur la gestion du stress",
  "L'organisation de la semaine et de l'emploi du temps",
  "Les méthodes de travail",
  "La découverte de différents profils et parcours"
];

export const stageRentreeHighlightsIntro =
  "Interrogés sur les trois choses qui leur ont le plus servi pendant la semaine, les étudiants ont cité :";

export const stageRentreePhoto = {
  src: "/images/stage-rentree/stage-rentree-agms.jpg",
  alt: "Étudiants en salle de cours pendant le stage de rentrée AGMS à Jarry",
  caption: "Stage de rentrée — salle de travail de l'AGMS, Jarry."
};

export const stageTestimonials = [
  {
    quote:
      "Merci beaucoup pour cette semaine, je ne l'ai même pas vue passer. J'ai pu prendre confiance et apprécier travailler pour moi.",
    author: "E. C.",
    context: "Étudiante du stage de rentrée"
  },
  {
    quote: "Vous m'avez éclairée sur l'année de PASS. J'appréhende beaucoup moins.",
    author: "L. R.",
    context: "Étudiante du stage de rentrée"
  }
];

export const stageRentreeCta =
  "Les demandes d'inscription à l'accompagnement gratuit sous conditions sont ouvertes pour la rentrée 2027-2028. Le dossier se remplit en ligne, sans pièce justificative : l'équipe AGMS vous rappelle ensuite pour étudier votre éligibilité et confirmer la voie adaptée, dans la limite des 20 places disponibles.";

/** Avertissement affiché en tête des contenus datés d'avant la réforme (le texte d'origine n'est pas modifié). */
export const preReformNotice =
  "Publié avant la réforme : à la rentrée 2027, la licence portail santé remplace le PASS et la LAS.";

/**
 * Demande d'inscription (dossier de candidature en ligne, gratuit, sans pièce justificative).
 * La date d'ouverture est contrôlée côté serveur (lib/preinscription-server.ts).
 */
export const preinscription = {
  season: "rentrée 2027-2028",
  openingLabel: "jeudi 1er octobre 2026",
  steps: [
    "Vous remplissez votre demande d'inscription en ligne, gratuitement et sans pièce justificative.",
    "L'équipe AGMS étudie votre éligibilité et vous recontacte.",
    "Nous confirmons la voie adaptée : dispositif gratuit sous conditions ou accompagnement payant ouvert à tous avec Cours Médical."
  ],
  notice:
    "La demande d'inscription ne vaut pas inscription définitive. L'accès au dispositif gratuit reste soumis à l'éligibilité et à la sélection, dans la limite des 20 places disponibles. L'inscription devient définitive après votre admission en licence portail santé.",
  situations: [
    "Lycéen·ne en Terminale",
    "Étudiant·e en PASS ou LAS",
    "En réorientation",
    "Autre situation"
  ],
  scholarship: ["Oui", "Demande en cours", "Non"],
  scholarshipLevels: ["0 bis", "1", "2", "3", "4", "5", "6", "7", "Je ne sais pas"],
  bacMentionStatus: ["Obtenue", "Visée cette année", "Pas de mention"],
  bacMentions: ["Assez bien", "Bien", "Très bien"],
  imageRights: ["J'autorise", "Je refuse"]
};

/** Suivi de l'éligibilité dans l'espace admin (sans valeur : « à étudier »). */
export const eligibilityStatuses = [
  { value: "a-etudier", label: "À étudier" },
  { value: "eligible", label: "Éligible" },
  { value: "non-eligible", label: "Non éligible" }
] as const;

export type EligibilityStatus = (typeof eligibilityStatuses)[number]["value"];

/** Ce que la licence portail santé change pour l'accompagnement (repris de l'encadré de l'article). */
export const reformAdaptations = [
  {
    title: "Choisir sa discipline",
    text: "Elle compte autant que la santé pour être classé : nous vous aidons à choisir celle dans laquelle vous pouvez réussir."
  },
  {
    title: "Organiser deux programmes",
    text: "Bloc santé et bloc disciplinaire se valident séparément : nous vous aidons à répartir votre travail entre les deux."
  },
  {
    title: "S'entraîner en conditions réelles",
    text: "Le classement se joue sur la première session : colles, QCM et annales chaque semaine pour arriver prêt."
  }
];

/** Intervention du major 2024-2025 auprès des étudiants (22 octobre 2026). */
export const majorMeetup = {
  image: "/images/vie-de-l-accompagnement/intervention-major-2024-2025.webp",
  caption: "Intervention du major 2024-2025 auprès de nos étudiants",
  title: "Le major 2024-2025 à la rencontre de nos étudiants",
  intro:
    "Le 22 octobre 2026, le major de la promotion 2024-2025 est venu partager son expérience avec nos étudiants.",
  programme: [
    "La présentation de sa méthode de travail",
    "Comment il a appréhendé son année",
    "Un temps de questions-réponses avec les étudiants"
  ],
  testimonial: {
    quote:
      "L'échange avec le major m'a permis de reprendre confiance en moi et de comprendre que cette année n'est facile pour personne. Je sais maintenant que j'ai bien ma place en médecine, et je compte continuer à travailler pour la deuxième année.",
    author: "Étudiante de la prépa, promotion 2026-2027"
  }
};

export const eligibilityText =
  "Pour connaître votre éligibilité, déposez votre demande d'inscription. À partir de ces éléments, l'équipe AGMS vous rappelle pour échanger, vérifier votre situation et confirmer si vous relevez du dispositif gratuit sous conditions ou d'un accompagnement payant ouvert à tous.";

export const eligibilityCriteria = [
  "Dispositif gratuit sous conditions réservé aux étudiants éligibles",
  "Critères sociaux, notamment bourse ou situation sociale éligible",
  "Étude du dossier scolaire et des résultats au bac",
  "Places limitées, avec sélection sur dossier et entretien",
  "Admission en licence portail santé nécessaire pour intégrer l'accompagnement gratuit sous conditions",
  "Échelon de bourse et mention au bac demandés dans le dossier, sans pièce justificative à ce stade",
  "Une voie payante ouverte à tous peut être proposée avec Cours Médical si le dispositif gratuit sous conditions ne correspond pas à votre situation"
];

export const annualTimeline = [
  {
    period: "Octobre à mars",
    title: "Informer les lycéens",
    items: [
      "Interventions dans les lycées",
      "Information sur la licence portail santé et Parcoursup",
      "Découverte des métiers de la santé",
      "Échanges avec étudiants tuteurs et professionnels"
    ]
  },
  {
    period: "Août / septembre",
    title: "Démarrer avec méthode",
    items: [
      "Méthodologie",
      "Organisation",
      "Introduction aux matières",
      "Compréhension du fonctionnement de la première année de santé"
    ]
  },
  {
    period: "Septembre à décembre",
    title: "Structurer le premier semestre",
    items: [
      "Cours de soutien",
      "TD",
      "Colles",
      "Suivi pédagogique",
      "Travail sur les matières du premier semestre"
    ]
  },
  {
    period: "Décembre / janvier",
    title: "Préparer les échéances",
    items: ["Révisions", "Annales", "Examens blancs", "Bilan individuel"]
  },
  {
    period: "Janvier à mai",
    title: "Consolider le second semestre",
    items: [
      "Accompagnement du second semestre",
      "Consolidation des méthodes",
      "Suivi des résultats",
      "Préparation des échéances"
    ]
  },
  {
    period: "Pendant l'année",
    title: "Soutenir la progression",
    items: [
      "Ateliers méthodologiques",
      "Aide à l'organisation",
      "Gestion du stress",
      "Suivi individualisé",
      "Espace collaboratif entre élèves, enseignants et tuteurs"
    ]
  },
  {
    period: "Janvier à juin",
    title: "Ouvrir les horizons santé",
    items: [
      "Salon des métiers de la santé",
      "Orientation",
      "Rencontres avec professionnels et structures de formation"
    ]
  }
];

export const supportCards = [
  {
    icon: "GraduationCap",
    title: "Préparation annuelle en première année de santé",
    text: "Accompagnement continu combinant ED en petits groupes, colles corrigées, suivi individualisé et méthode de travail."
  },
  {
    icon: "CalendarDays",
    title: "Mise en route méthodologique",
    text: "Repères sur le fonctionnement de la première année de santé (licence portail santé, PASS, LAS), organisation, matières clés et confiance dans la méthode de travail."
  },
  {
    icon: "BookOpen",
    title: "Cours de soutien ciblés",
    text: "Renfort par matière, reprise des notions complexes, supports clairs et entraînement régulier aux QCM."
  },
  {
    icon: "ClipboardCheck",
    title: "QCM, ED et colles",
    text: "QCM hebdomadaires, entraînements intégrés aux ED, colles corrigées, annales et retours pédagogiques."
  },
  {
    icon: "Lightbulb",
    title: "Méthodologie de la première année de santé",
    text: "Organisation, planification, mémorisation active, priorisation, gestion du temps et stratégie de réponse."
  },
  {
    icon: "HeartHandshake",
    title: "Suivi personnalisé et bien-être",
    text: "Entretiens réguliers, repérage des difficultés, prévention de l'isolement et ateliers de gestion du stress."
  },
  {
    icon: "Users",
    title: "Tuteurs qualifiés",
    text: "Accompagnement par des tuteurs ayant réussi leur première année de santé, capables de transmettre méthode, expérience et repères concrets."
  },
  {
    icon: "School",
    title: "Salle de travail et BU virtuelle",
    text: "Cadre de travail dédié, espace collaboratif et ressources pédagogiques pour soutenir l'autonomie des étudiants."
  }
];

export const salonText =
  "Le salon des métiers de la santé est un temps fort du projet FSE+ de l'AGMS. Organisé le samedi 19 septembre 2026 au Palais des Sports du Gosier, il visait à informer les jeunes et leurs familles sur la diversité des métiers médicaux, paramédicaux, sociaux, de prévention et de recherche. Il a aussi permis de créer un lien concret entre lycéens, étudiants, professionnels de santé, centres de formation et acteurs de l'orientation.";

export const salonItems = [
  "Témoignages de professionnels",
  "Ateliers",
  "Démonstrations",
  "Stands d'information",
  "Présentation des parcours",
  "Échanges avec étudiants et tuteurs",
  "Orientation individualisée"
];

export const salonEventDetails = [
  {
    label: "Date",
    value: "Samedi 19 septembre 2026",
    text: "Le bilan de fréquentation est présenté ci-dessous."
  },
  {
    label: "Lieu",
    value: "Palais des Sports du Gosier",
    text: "Un lieu accessible pour accueillir lycéens, familles, étudiants, professionnels et partenaires."
  },
  {
    label: "Publics",
    value: "Jeunes, familles et acteurs éducatifs",
    text: "Lycéens de Première et Terminale, étudiants en première année de santé, parents, équipes éducatives et partenaires santé."
  }
];

export const salonProfessionalExamples = [
  {
    icon: "Stethoscope",
    title: "Médecins et internes",
    text: "Exemples de parcours en médecine générale, spécialités médicales, urgences, santé publique ou recherche."
  },
  {
    icon: "HeartHandshake",
    title: "Sages-femmes et professionnels du soin",
    text: "Échanges autour de la maïeutique, du suivi des patients, de la prévention et des réalités du terrain."
  },
  {
    icon: "Users",
    title: "Infirmiers et cadres de santé",
    text: "Présentation des métiers infirmiers, des évolutions possibles et des formations accessibles en Guadeloupe."
  },
  {
    icon: "GraduationCap",
    title: "Étudiants et tuteurs",
    text: "Retours d'expérience sur la première année de santé, Parcoursup, l'organisation du travail et la vie étudiante."
  },
  {
    icon: "School",
    title: "Centres de formation et orientation",
    text: "Informations sur les cursus, prérequis, durées d'études, passerelles et démarches d'inscription."
  },
  {
    icon: "ClipboardCheck",
    title: "Paramédical, social et prévention",
    text: "Exemples : kinésithérapie, pharmacie, odontologie, psychologie, prévention, médico-social et recherche."
  }
];

export const salonProgram = [
  "Stands d'information sur les formations et les métiers de la santé",
  "Rencontres avec des professionnels et des étudiants",
  "Mini-conférences et témoignages de parcours",
  "Ateliers pratiques et démonstrations de gestes ou matériels",
  "Temps d'échange autour de la licence portail santé et de Parcoursup",
  "Orientation individualisée pour aider chaque jeune à clarifier son projet"
];

export const applicationText =
  "La demande d'inscription ne vaut pas admission définitive. Elle sert à étudier votre éligibilité et à organiser un échange pour confirmer la voie adaptée : dispositif gratuit sous conditions si vous êtes éligible, ou accompagnement payant ouvert à tous avec Cours Médical, hors dispositif gratuit.";

export const faqItems = [
  {
    question: "Le dispositif gratuit est-il vraiment gratuit ?",
    answer:
      "Oui, le dispositif gratuit sous conditions est réservé aux étudiants éligibles, notamment selon la situation de bourse, le dossier et les résultats au bac, dans la limite des 20 places disponibles et après entretien."
  },
  {
    question: "Comment savoir si je suis éligible ?",
    answer:
      "Le plus simple est de déposer votre demande d'inscription en ligne. Vous y indiquez votre situation de bourse (et votre échelon), votre mention au bac et votre parcours ; l'équipe AGMS vous rappelle ensuite pour échanger et confirmer votre éligibilité."
  },
  {
    question: "Que se passe-t-il si je ne suis pas éligible au gratuit ?",
    answer:
      "Une voie payante ouverte à tous peut être proposée avec Cours Médical, hors dispositif gratuit FSE+. La demande d'inscription sert justement à orienter chaque famille vers la réponse adaptée."
  },
  {
    question: "Où ont lieu les cours ?",
    answer:
      "Les cours et temps d'accompagnement ont lieu dans les locaux de l'AGMS à Jarry, Baie-Mahault."
  },
  {
    question: "Combien de places sont disponibles ?",
    answer: "Le dispositif gratuit sous conditions prévoit 20 places au total."
  },
  {
    question: "Que comprend l'accompagnement ?",
    answer:
      "Préparation annuelle, cours de soutien ciblés, ED en petits groupes, colles corrigées, QCM, annales, suivi personnalisé, ateliers méthodologiques et accompagnement humain."
  },
  {
    question: "Est-ce réservé aux étudiants en médecine ?",
    answer:
      "Le dispositif accompagne la première année de santé, qui mène aux filières de médecine, maïeutique, odontologie et pharmacie : la licence portail santé à partir de la rentrée 2027, le PASS et la LAS pour les étudiants déjà engagés dans ces parcours."
  },
  {
    question: "Comment faire ma demande ?",
    answer:
      "Il suffit de remplir la demande d'inscription en ligne. L'équipe AGMS recontacte ensuite l'étudiant ou sa famille pour confirmer la voie adaptée."
  }
];
