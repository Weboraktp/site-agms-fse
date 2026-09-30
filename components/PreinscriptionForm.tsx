"use client";

import Link from "next/link";
import { FormEvent, startTransition, useActionState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { submitPreinscription, type PreinscriptionState } from "@/app/pre-inscription/actions";
import { preinscription, site } from "@/lib/content";

const initialState: PreinscriptionState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  return message ? <small className="form-field-error">{message}</small> : null;
}

export function PreinscriptionForm() {
  const [state, formAction, pending] = useActionState(submitPreinscription, initialState);
  const errors = state.fieldErrors ?? {};
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Après l'envoi : on montre la confirmation, ou on place le curseur sur le premier champ à corriger.
  useEffect(() => {
    if (state.status === "success") {
      doneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (state.status === "error") {
      const firstInvalid = Object.keys(state.fieldErrors ?? {})[0];
      const target = firstInvalid
        ? formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        : formRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (firstInvalid) target?.focus({ preventScroll: true });
    }
  }, [state]);

  // Envoi manuel pour éviter la remise à zéro automatique du formulaire en cas d'erreur.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  if (state.status === "success") {
    return (
      <div className="contact-form form-done" role="status" ref={doneRef}>
        <CheckCircle size={40} aria-hidden="true" />
        <h2>Merci{state.firstName ? ` ${state.firstName}` : ""}, votre pré-inscription est bien enregistrée !</h2>
        <p>
          L&apos;équipe AGMS vous recontacte très prochainement par téléphone ou par e-mail pour
          faire le point sur votre projet.
        </p>
        <p>
          Une question d&apos;ici là ? Appelez-nous au{" "}
          <a href={`tel:${site.phones[0].replace(/\s/g, "")}`}>{site.phones[0]}</a> ou écrivez à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <Link className="button button--primary" href="/">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <form className="contact-form" action={formAction} onSubmit={handleSubmit} ref={formRef}>
      {state.status === "error" && state.message ? (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="form-privacy-note">
        <strong>Pré-inscription {preinscription.season}</strong>
        <p>2 minutes suffisent. Les champs marqués d&apos;un * sont obligatoires.</p>
      </div>

      <div className="form-grid">
        <label>
          Prénom *
          <input name="firstName" type="text" autoComplete="given-name" maxLength={80} required />
          <FieldError message={errors.firstName} />
        </label>
        <label>
          Nom *
          <input name="lastName" type="text" autoComplete="family-name" maxLength={80} required />
          <FieldError message={errors.lastName} />
        </label>
        <label>
          E-mail *
          <input name="email" type="email" autoComplete="email" maxLength={160} required />
          <FieldError message={errors.email} />
        </label>
        <label>
          Téléphone *
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            placeholder="0690 00 00 00"
            required
          />
          <FieldError message={errors.phone} />
        </label>
      </div>

      <label className="form-message">
        Situation de l&apos;étudiant·e *
        <select name="situation" required defaultValue="">
          <option value="" disabled>
            Choisir
          </option>
          {preinscription.situations.map((situation) => (
            <option key={situation} value={situation}>
              {situation}
            </option>
          ))}
        </select>
        <FieldError message={errors.situation} />
      </label>

      <label className="form-message">
        Lycée ou établissement actuel
        <input name="school" type="text" autoComplete="organization" maxLength={120} />
      </label>

      <label className="form-message">
        Message
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Vous êtes parent ? Précisez le prénom de l'étudiant·e. Vos questions, le meilleur moment pour vous rappeler…"
        />
      </label>

      {/* Piège à robots : invisible pour les visiteurs. */}
      <div className="form-hp" aria-hidden="true">
        <label>
          Ne pas remplir
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="form-consent">
        <input name="consent" type="checkbox" required />
        <span>
          J&apos;accepte que l&apos;AGMS utilise ces informations pour me recontacter au sujet de ma
          pré-inscription. *
        </span>
      </label>
      <FieldError message={errors.consent} />

      <button className="button button--primary form-submit" type="submit" disabled={pending}>
        {pending ? "Envoi en cours…" : "Envoyer ma pré-inscription"}
      </button>

      <p className="form-legal">
        Vos données sont uniquement utilisées par l&apos;AGMS pour traiter votre pré-inscription et
        ne sont jamais transmises à des tiers. Vous pouvez demander leur modification ou leur
        suppression à tout moment en écrivant à {site.email}.
      </p>
    </form>
  );
}
