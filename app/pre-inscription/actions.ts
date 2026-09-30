"use server";

import { randomUUID } from "node:crypto";
import { preinscription, site } from "@/lib/content";
import { isPreinscriptionOpen, savePreinscription } from "@/lib/preinscription-server";

type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "situation"
  | "school"
  | "message"
  | "consent";

export type PreinscriptionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  firstName?: string;
};

function field(formData: FormData, name: string, maxLength: number) {
  return String(formData.get(name) ?? "")
    .trim()
    .slice(0, maxLength);
}

export async function submitPreinscription(
  _previous: PreinscriptionState,
  formData: FormData
): Promise<PreinscriptionState> {
  if (!isPreinscriptionOpen()) {
    return {
      status: "error",
      message: `Les pré-inscriptions ouvrent le ${preinscription.openingLabel}.`
    };
  }

  // Champ invisible rempli uniquement par les robots : on fait mine d'accepter.
  if (field(formData, "website", 200)) {
    return { status: "success" };
  }

  const values = {
    firstName: field(formData, "firstName", 80),
    lastName: field(formData, "lastName", 80),
    email: field(formData, "email", 160).toLowerCase(),
    phone: field(formData, "phone", 30),
    situation: field(formData, "situation", 80),
    school: field(formData, "school", 120),
    message: field(formData, "message", 2000)
  };

  const fieldErrors: PreinscriptionState["fieldErrors"] = {};
  if (!values.firstName) fieldErrors.firstName = "Indiquez votre prénom.";
  if (!values.lastName) fieldErrors.lastName = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email = "Indiquez une adresse e-mail valide.";
  }
  const phoneDigits = values.phone.replace(/\D/g, "").length;
  if (!/^[0-9+().\s-]+$/.test(values.phone) || phoneDigits < 9 || phoneDigits > 15) {
    fieldErrors.phone = "Indiquez un numéro de téléphone valide.";
  }
  if (!preinscription.situations.includes(values.situation)) {
    fieldErrors.situation = "Choisissez votre situation.";
  }
  if (formData.get("consent") !== "on") {
    fieldErrors.consent = "Votre accord est nécessaire pour que nous puissions vous recontacter.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Merci de vérifier les champs indiqués.",
      fieldErrors
    };
  }

  try {
    await savePreinscription({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...values
    });
  } catch (error) {
    console.error("Enregistrement de la pré-inscription impossible", error);
    return {
      status: "error",
      message: `Votre pré-inscription n'a pas pu être enregistrée. Réessayez dans un instant ou contactez-nous au ${site.phones[0]}.`
    };
  }

  return { status: "success", firstName: values.firstName };
}
