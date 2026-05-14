"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/candidature", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Une erreur est survenue.");
      }

      form.reset();
      setState("success");
    } catch (submitError) {
      setState("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "La demande n'a pas pu être envoyée pour le moment."
      );
    }
  }

  return (
    <form className={`contact-form ${compact ? "contact-form--compact" : ""}`} onSubmit={handleSubmit}>
      {state === "success" ? (
        <div className="form-success" role="status">
          Votre demande a bien été prise en compte. L'équipe AGMS vous recontactera rapidement.
        </div>
      ) : null}

      {state === "error" ? (
        <div className="form-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="form-grid">
        <label>
          Nom
          <input name="nom" autoComplete="family-name" required />
        </label>
        <label>
          Prénom
          <input name="prenom" autoComplete="given-name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Téléphone
          <input name="telephone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          Commune
          <input name="commune" autoComplete="address-level2" />
        </label>
        <label>
          Situation actuelle
          <select name="situation" defaultValue="" required>
            <option value="" disabled>
              Sélectionner
            </option>
            <option>Terminale</option>
            <option>PASS</option>
            <option>LAS</option>
            <option>Autre</option>
          </select>
        </label>
        <label>
          Formation visée ou obtenue
          <select name="formation" defaultValue="" required>
            <option value="" disabled>
              Sélectionner
            </option>
            <option>PASS</option>
            <option>LAS</option>
            <option>En réflexion</option>
          </select>
        </label>
        <label>
          Êtes-vous boursier ?
          <select name="boursier" defaultValue="" required>
            <option value="" disabled>
              Sélectionner
            </option>
            <option>Oui</option>
            <option>Non</option>
            <option>Demande en cours</option>
          </select>
        </label>
        <label>
          Admission PASS/LAS
          <select name="admission" defaultValue="" required>
            <option value="" disabled>
              Sélectionner
            </option>
            <option>Oui</option>
            <option>Non</option>
            <option>En attente</option>
          </select>
        </label>
        <label>
          Document facultatif
          <input name="document" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
          <small>Les documents pourront aussi être fournis ultérieurement.</small>
        </label>
      </div>

      <label className="form-message">
        Message libre
        <textarea
          name="message"
          rows={compact ? 4 : 6}
          placeholder="Précisez votre situation, votre parcours ou vos questions."
        />
      </label>

      <label className="form-consent">
        <input name="consentement" type="checkbox" required />
        <span>
          J'accepte que les informations transmises soient utilisées pour le traitement de ma demande
          de candidature ou d'information.
        </span>
      </label>

      <button className="button button--primary form-submit" type="submit" disabled={state === "submitting"}>
        <Send size={18} aria-hidden="true" />
        {state === "submitting" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
