"use client";

import { useFormStatus } from "react-dom";
import { sendPreinscriptionToCockpit } from "@/app/admin/actions";
import type { CockpitState } from "@/lib/preinscription-server";

/** Ce que disent les codes d'erreur gardés dans l'enregistrement. */
function errorLabel(code: string) {
  if (code === "delai" || code === "reseau") return "cockpit injoignable";
  if (code === "http_401") return "clé refusée";
  if (code === "http_400" || code === "nom_absent") return "demande refusée";
  if (code === "http_503") return "réception fermée côté cockpit";
  if (code === "reponse_inattendue") return "réponse inattendue, adresse du cockpit à vérifier";
  return `erreur ${code.replace("http_", "")}`;
}

function SendButton({ retry }: { retry: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className="admin-cockpit__button" type="submit" disabled={pending}>
      {pending ? "Envoi…" : retry ? "Renvoyer" : "Transmettre"}
    </button>
  );
}

/**
 * Transmission de la demande au cockpit de l'AGMS : faite le…, en échec, ou jamais tentée
 * (demandes reçues avant le raccordement). Le bouton envoie une seule demande, sans doublon possible.
 * Deux cas sont signalés : une demande de plus de 14 jours (elle n'est pas renvoyée toute
 * seule), et une transmission pour laquelle le cockpit n'a pas confirmé « aucun message automatique ».
 */
export function AdminCockpit({
  pathname,
  state,
  sentLabel,
  canSend,
  late
}: {
  pathname: string;
  state?: CockpitState;
  /** Date de transmission, déjà mise en forme par la page. */
  sentLabel?: string;
  canSend: boolean;
  /** Reçue il y a plus de 14 jours : le cockpit ne prévient plus ses référents par e-mail. */
  late: boolean;
}) {
  if (state?.status === "transmise") {
    return (
      <div className="admin-cockpit">
        <span className="admin-table__sub">Cockpit : transmise le {sentLabel}</span>
        {state.automated ? (
          <span className="admin-table__sub is-error">
            Le cockpit n&apos;a pas confirmé l&apos;absence de message automatique : vérifiez
            qu&apos;aucun WhatsApp n&apos;est parti.
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="admin-cockpit">
      {state?.status === "erreur" ? (
        <span className="admin-table__sub is-error">Cockpit : échec ({errorLabel(state.code)})</span>
      ) : (
        <span className="admin-table__sub">Cockpit : non transmise</span>
      )}
      {canSend && late ? (
        <span className="admin-table__sub is-warning">
          Reçue il y a plus de 14 jours : elle n&apos;est pas renvoyée automatiquement,
          transmettez-la avec ce bouton.
        </span>
      ) : null}
      {canSend ? (
        <form action={sendPreinscriptionToCockpit}>
          <input type="hidden" name="pathname" value={pathname} />
          <SendButton retry={state?.status === "erreur"} />
        </form>
      ) : null}
    </div>
  );
}
