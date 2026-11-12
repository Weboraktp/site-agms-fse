"use server";

import { randomUUID } from "node:crypto";
import { preinscription, site } from "@/lib/content";
import { isPreinscriptionOpen, savePreinscription } from "@/lib/preinscription-server";

type Field =
  | "firstName"
  | "lastName"
  | "birthDate"
  | "email"
  | "phone"
  | "address"
  | "postalCode"
  | "city"
  | "situation"
  | "school"
  | "discipline"
  | "scholarship"
  | "scholarshipLevel"
  | "bacMentionStatus"
  | "bacMention"
  | "emergencyName"
  | "emergencyRelation"
  | "emergencyPhone"
  | "imageRights"
  | "message"
  | "commitment"
  | "consent";

export type PreinscriptionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  firstName?: string;
  /** Situation de bourse déclarée : « Non » oriente vers Cours Médical sur l'écran de confirmation. */
  scholarship?: string;
};

function field(formData: FormData, name: string, maxLength: number) {
  return String(formData.get(name) ?? "")
    .trim()
    .slice(0, maxLength);
}

function isPhone(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return /^[0-9+().\s-]+$/.test(value) && digits >= 9 && digits <= 15;
}

function isBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  const year = date.getUTCFullYear();
  return !Number.isNaN(date.getTime()) && year >= 1950 && year <= new Date().getUTCFullYear() - 13;
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
    birthDate: field(formData, "birthDate", 10),
    email: field(formData, "email", 160).toLowerCase(),
    phone: field(formData, "phone", 30),
    address: field(formData, "address", 200),
    postalCode: field(formData, "postalCode", 10),
    city: field(formData, "city", 80),
    situation: field(formData, "situation", 80),
    school: field(formData, "school", 120),
    discipline: field(formData, "discipline", 120),
    scholarship: field(formData, "scholarship", 40),
    scholarshipLevel: field(formData, "scholarshipLevel", 20),
    bacMentionStatus: field(formData, "bacMentionStatus", 40),
    bacMention: field(formData, "bacMention", 40),
    emergencyName: field(formData, "emergencyName", 120),
    emergencyRelation: field(formData, "emergencyRelation", 60),
    emergencyPhone: field(formData, "emergencyPhone", 30),
    imageRights: field(formData, "imageRights", 20),
    whatsappGroup: formData.get("whatsappGroup") === "on",
    message: field(formData, "message", 2000)
  };

  const fieldErrors: PreinscriptionState["fieldErrors"] = {};
  if (!values.firstName) fieldErrors.firstName = "Indiquez le prénom.";
  if (!values.lastName) fieldErrors.lastName = "Indiquez le nom.";
  if (!isBirthDate(values.birthDate)) fieldErrors.birthDate = "Indiquez une date de naissance valide.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email = "Indiquez une adresse e-mail valide.";
  }
  if (!isPhone(values.phone)) fieldErrors.phone = "Indiquez un numéro de téléphone valide.";
  if (!values.address) fieldErrors.address = "Indiquez l'adresse.";
  if (!/^\d{5}$/.test(values.postalCode)) fieldErrors.postalCode = "Indiquez un code postal à 5 chiffres.";
  if (!values.city) fieldErrors.city = "Indiquez la ville.";
  if (!preinscription.situations.includes(values.situation)) {
    fieldErrors.situation = "Choisissez la situation.";
  }
  if (!preinscription.scholarship.includes(values.scholarship)) {
    fieldErrors.scholarship = "Indiquez la situation de bourse.";
  }
  if (values.scholarship === "Oui" && !preinscription.scholarshipLevels.includes(values.scholarshipLevel)) {
    fieldErrors.scholarshipLevel = "Indiquez l'échelon de bourse.";
  }
  if (!preinscription.bacMentionStatus.includes(values.bacMentionStatus)) {
    fieldErrors.bacMentionStatus = "Indiquez où vous en êtes pour la mention au bac.";
  } else if (
    values.bacMentionStatus !== "Pas de mention" &&
    !preinscription.bacMentions.includes(values.bacMention)
  ) {
    fieldErrors.bacMention = "Indiquez la mention.";
  }
  if (!values.emergencyName) fieldErrors.emergencyName = "Indiquez un nom.";
  if (!values.emergencyRelation) fieldErrors.emergencyRelation = "Indiquez le lien.";
  if (!isPhone(values.emergencyPhone)) {
    fieldErrors.emergencyPhone = "Indiquez un numéro de téléphone valide.";
  }
  if (!preinscription.imageRights.includes(values.imageRights)) {
    fieldErrors.imageRights = "Faites votre choix.";
  }
  if (formData.get("commitment") !== "on") {
    fieldErrors.commitment = "Cet engagement est nécessaire pour déposer la demande.";
  }
  if (formData.get("consent") !== "on") {
    fieldErrors.consent = "Votre accord est nécessaire pour traiter votre demande.";
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
      ...values,
      // L'échelon et la mention n'ont de sens que si la réponse précédente les appelle.
      scholarshipLevel: values.scholarship === "Oui" ? values.scholarshipLevel : "",
      bacMention: values.bacMentionStatus === "Pas de mention" ? "" : values.bacMention
    });
  } catch (error) {
    console.error("Enregistrement de la demande d'inscription impossible", error);
    return {
      status: "error",
      message: `Votre demande n'a pas pu être enregistrée. Réessayez dans un instant ou contactez-nous au ${site.phones[0]}.`
    };
  }

  return { status: "success", firstName: values.firstName, scholarship: values.scholarship };
}
