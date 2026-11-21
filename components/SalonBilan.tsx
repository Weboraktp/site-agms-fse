import { salonBilan, salonProfils } from "@/lib/salon-bilan";

/** Les deux chiffres à retenir, avec la réserve sur le recensement. */
export function SalonBilanChiffres() {
  const { preinscrits, preinscritsRecenses, sansPreinscription, visiteursRecenses } = salonBilan;

  return (
    <>
      <ul className="article-list">
        <li>
          <strong>{`${preinscrits} pré-inscriptions`}</strong>
          {", recueillies via les réseaux sociaux (les doublons ont été retirés)."}
        </li>
        <li>
          <strong>{`${visiteursRecenses} visiteurs recensés avant 14 h`}</strong>
          {` : ${preinscritsRecenses} pré-inscrits et ${sansPreinscription} personnes venues sans s'être pré-inscrites, relevées sur place.`}
        </li>
      </ul>
      <p>
        Le recensement des présences a été effectué de 9 h à 14 h. Les personnes arrivées après 14 h
        n&apos;ont pas été relevées : ces chiffres sont donc un minimum, et la fréquentation réelle
        du salon est plus élevée.
      </p>
    </>
  );
}

/** Pré-inscrits par profil et présences recensées avant 14 h. */
export function SalonBilanProfils() {
  const { preinscrits, preinscritsRecenses } = salonBilan;
  const familles = salonProfils.find((ligne) => ligne.profil === "Parents et familles");

  return (
    <>
      <div className="article-table">
        <table>
          <caption>Pré-inscrits par profil et présences recensées avant 14 h</caption>
          <thead>
            <tr>
              <th scope="col">Profil</th>
              <th scope="col">Pré-inscrits</th>
              <th scope="col">Recensés avant 14 h</th>
            </tr>
          </thead>
          <tbody>
            {salonProfils.map((ligne) => (
              <tr key={ligne.profil}>
                <th scope="row">{ligne.profil}</th>
                <td>{ligne.preinscrits}</td>
                <td>{ligne.recenses}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Total</th>
              <td>
                <strong>{preinscrits}</strong>
              </td>
              <td>
                <strong>{preinscritsRecenses}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {familles ? (
        <p>
          {`Les parents et les familles forment le premier public des pré-inscriptions (${familles.preinscrits} sur ${preinscrits}), devant les professionnels, les étudiants et les lycéens.`}
        </p>
      ) : null}
      <p>
        <em>
          Sources : base d&apos;inscription du salon et feuille d&apos;émargement. Action cofinancée
          par le FSE+.
        </em>
      </p>
    </>
  );
}
