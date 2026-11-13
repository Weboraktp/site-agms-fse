"use client";

import Link from "next/link";
import { FormEvent, startTransition, useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { submitPreinscription, type PreinscriptionState } from "@/app/pre-inscription/actions";
import { coursMedical, preinscription, site } from "@/lib/content";

const initialState: PreinscriptionState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  return message ? <small className="form-field-error">{message}</small> : null;
}

/** Encadré qui oriente les non-boursiers vers Cours Médical, sans bloquer l'envoi. */
function CoursMedicalHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="form-hint">
      {children}{" "}
      <a href={coursMedical.inscriptionUrl} target="_blank" rel="noreferrer">
        Découvrir l&apos;inscription à Cours Médical
        <ExternalLink size={13} aria-hidden="true" />
      </a>
    </p>
  );
}

export function PreinscriptionForm() {
  const [state, formAction, pending] = useActionState(submitPreinscription, initialState);
  const [scholarship, setScholarship] = useState("");
  const [mentionStatus, setMentionStatus] = useState("");
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
        <h2>
          Merci{state.firstName ? ` ${state.firstName}` : ""}, votre demande d&apos;inscription est
          enregistrée !
        </h2>
        <p>
          Candidature enregistrée : l&apos;équipe AGMS vous recontacte très prochainement, par
          téléphone ou par e-mail, pour étudier votre éligibilité au dispositif.
        </p>
        <p>
          Aucun paiement n&apos;est demandé et aucune pièce justificative n&apos;est nécessaire à ce
          stade.
        </p>
        {state.scholarship === "Non" ? (
          <CoursMedicalHint>
            Vous n&apos;êtes pas boursier·ère : l&apos;équipe étudiera quand même votre demande, et
            vous pouvez aussi rejoindre la prépa Cours Médical, ouverte à tous.
          </CoursMedicalHint>
        ) : null}
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
        <strong>Demande d&apos;inscription {preinscription.season}</strong>
        <p>
          Gratuite, environ 5 minutes, aucune pièce justificative à fournir. Les champs marqués
          d&apos;un * sont obligatoires.
        </p>
      </div>

      <fieldset className="form-section">
        <legend>1. L&apos;étudiant·e</legend>
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
            Date de naissance *
            <input name="birthDate" type="date" autoComplete="bday" required />
            <FieldError message={errors.birthDate} />
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
          <label className="form-grid__wide">
            E-mail *
            <input name="email" type="email" autoComplete="email" maxLength={160} required />
            <FieldError message={errors.email} />
          </label>
          <label className="form-grid__wide">
            Adresse *
            <input name="address" type="text" autoComplete="street-address" maxLength={200} required />
            <FieldError message={errors.address} />
          </label>
          <label>
            Code postal *
            <input
              name="postalCode"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={5}
              placeholder="97100"
              required
            />
            <FieldError message={errors.postalCode} />
          </label>
          <label>
            Ville *
            <input name="city" type="text" autoComplete="address-level2" maxLength={80} required />
            <FieldError message={errors.city} />
          </label>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>2. Situation</legend>
        <div className="form-grid">
          <label>
            Situation actuelle *
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
          <label>
            Lycée ou établissement actuel
            <input name="school" type="text" autoComplete="organization" maxLength={120} />
          </label>
          <label className="form-grid__wide">
            Discipline envisagée en licence portail santé
            <input
              name="discipline"
              type="text"
              maxLength={120}
              placeholder="SVT, STAPS, droit, soins infirmiers… ou « je ne sais pas encore »"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>3. Bourse et mention au bac</legend>
        <div className="form-grid">
          <label>
            Êtes-vous boursier·ère sur critères sociaux ? *
            <select
              name="scholarship"
              required
              value={scholarship}
              onChange={(event) => setScholarship(event.target.value)}
            >
              <option value="" disabled>
                Choisir
              </option>
              {preinscription.scholarship.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.scholarship} />
          </label>
          {scholarship === "Oui" ? (
            <label>
              Échelon de bourse *
              <select name="scholarshipLevel" required defaultValue="">
                <option value="" disabled>
                  Choisir
                </option>
                {preinscription.scholarshipLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <FieldError message={errors.scholarshipLevel} />
            </label>
          ) : null}
          <label>
            Mention au bac *
            <select
              name="bacMentionStatus"
              required
              value={mentionStatus}
              onChange={(event) => setMentionStatus(event.target.value)}
            >
              <option value="" disabled>
                Choisir
              </option>
              {preinscription.bacMentionStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.bacMentionStatus} />
          </label>
          {mentionStatus === "Obtenue" || mentionStatus === "Visée cette année" ? (
            <label>
              {mentionStatus === "Obtenue" ? "Mention obtenue *" : "Mention visée *"}
              <select name="bacMention" required defaultValue="">
                <option value="" disabled>
                  Choisir
                </option>
                {preinscription.bacMentions.map((mention) => (
                  <option key={mention} value={mention}>
                    {mention}
                  </option>
                ))}
              </select>
              <FieldError message={errors.bacMention} />
            </label>
          ) : null}
        </div>
        {scholarship === "Non" ? (
          <CoursMedicalHint>
            Le dispositif gratuit s&apos;adresse d&apos;abord aux étudiants boursiers. Vous pouvez
            poursuivre votre demande : l&apos;équipe l&apos;étudiera. Vous pouvez aussi rejoindre
            directement la prépa Cours Médical, ouverte à tous, hors dispositif gratuit.
          </CoursMedicalHint>
        ) : null}
        {scholarship === "Demande en cours" ? (
          <p className="form-hint">
            Pas de souci : aucune notification n&apos;est demandée à ce stade. L&apos;équipe vous
            dira quand la transmettre.
          </p>
        ) : null}
      </fieldset>

      <fieldset className="form-section">
        <legend>4. Parent, représentant légal ou contact d&apos;urgence</legend>
        <div className="form-grid">
          <label>
            Nom et prénom *
            <input name="emergencyName" type="text" maxLength={120} required />
            <FieldError message={errors.emergencyName} />
          </label>
          <label>
            Lien avec l&apos;étudiant·e *
            <input name="emergencyRelation" type="text" maxLength={60} placeholder="Mère, père, tuteur…" required />
            <FieldError message={errors.emergencyRelation} />
          </label>
          <label>
            Téléphone *
            <input name="emergencyPhone" type="tel" inputMode="tel" maxLength={30} required />
            <FieldError message={errors.emergencyPhone} />
          </label>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>5. Autorisations et engagement</legend>
        <div className="form-radio-group" role="radiogroup" aria-label="Droit à l'image">
          <span>
            Droit à l&apos;image (photos prises pendant les cours et les stages, pour un usage
            interne et de communication) *
          </span>
          {preinscription.imageRights.map((option) => (
            <label className="form-radio" key={option}>
              <input name="imageRights" type="radio" value={option} required />
              {option}
            </label>
          ))}
          <FieldError message={errors.imageRights} />
        </div>

        <label className="form-consent">
          <input name="whatsappGroup" type="checkbox" />
          <span>J&apos;accepte d&apos;être ajouté·e au groupe WhatsApp de la promotion.</span>
        </label>

        <label className="form-consent">
          <input name="commitment" type="checkbox" required />
          <span>
            Je m&apos;engage à suivre l&apos;accompagnement avec assiduité et à respecter le
            règlement intérieur de l&apos;AGMS. Je comprends que l&apos;inscription définitive est
            conditionnée à mon admission en licence portail santé. *
          </span>
        </label>
        <FieldError message={errors.commitment} />

        <label className="form-consent">
          <input name="consent" type="checkbox" required />
          <span>
            J&apos;accepte que l&apos;AGMS utilise ces informations pour étudier mon éligibilité et me
            recontacter au sujet de ma demande d&apos;inscription. *
          </span>
        </label>
        <FieldError message={errors.consent} />
      </fieldset>

      <label className="form-message">
        Message
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Vos questions, le meilleur moment pour vous rappeler…"
        />
      </label>

      {/* Piège à robots : invisible pour les visiteurs. */}
      <div className="form-hp" aria-hidden="true">
        <label>
          Ne pas remplir
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="button button--primary form-submit" type="submit" disabled={pending}>
        {pending ? "Envoi en cours…" : "Envoyer ma demande d'inscription"}
        {pending ? null : <ArrowRight size={18} aria-hidden="true" />}
      </button>

      <p className="form-legal">
        Vos données sont uniquement utilisées par l&apos;AGMS pour traiter votre demande
        d&apos;inscription. Elles sont enregistrées sur ce site ; celles qui servent à étudier votre
        éligibilité et à vous recontacter le sont aussi dans l&apos;outil de gestion interne de
        l&apos;AGMS. Vous pouvez demander leur modification ou leur suppression à tout moment en
        écrivant à {site.email}.
      </p>
    </form>
  );
}
