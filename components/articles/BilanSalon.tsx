import { SalonBilanChiffres, SalonBilanProfils } from "@/components/SalonBilan";

/** Article du blog : bilan de fréquentation du salon du 19 septembre 2026. */
export function BilanSalon() {
  return (
    <>
      <p className="article-lead">
        Le samedi 19 septembre 2026, l&apos;AGMS a organisé au Gosier, avec l&apos;IRTS de
        Guadeloupe, le salon des métiers de la santé et du médico-social. Voici le bilan de sa
        fréquentation.
      </p>

      <h2>Les chiffres à retenir</h2>
      <SalonBilanChiffres />

      <h2>Qui s&apos;était pré-inscrit ?</h2>
      <SalonBilanProfils />
    </>
  );
}
