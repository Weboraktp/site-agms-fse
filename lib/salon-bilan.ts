/**
 * Bilan de fréquentation du salon des métiers de la santé et du médico-social (samedi 19 septembre 2026).
 * Source : base d'inscription et feuille d'émargement du salon. Seuls les totaux sont publiés, jamais de noms.
 * Le recensement des présences s'est arrêté à 14 h : les arrivées de l'après-midi n'ont pas été relevées.
 */
export const salonProfils = [
  { profil: "Lycéens", preinscrits: 60, recenses: 26 },
  { profil: "Étudiants", preinscrits: 72, recenses: 17 },
  { profil: "Parents et familles", preinscrits: 161, recenses: 49 },
  { profil: "Professionnels", preinscrits: 80, recenses: 18 },
  { profil: "Orienteurs", preinscrits: 8, recenses: 1 }
];

export const salonBilan = {
  preinscrits: salonProfils.reduce((somme, ligne) => somme + ligne.preinscrits, 0),
  preinscritsRecenses: salonProfils.reduce((somme, ligne) => somme + ligne.recenses, 0),
  sansPreinscription: 221,
  get visiteursRecenses() {
    return this.preinscritsRecenses + this.sansPreinscription;
  }
};
