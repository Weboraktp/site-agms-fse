import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const runtime = "nodejs";

const fieldLabels = {
  nom: "Nom",
  prenom: "Prénom",
  email: "Email",
  telephone: "Téléphone",
  commune: "Commune",
  situation: "Situation actuelle",
  formation: "Formation visée ou obtenue",
  boursier: "Boursier",
  admission: "Admission PASS/LAS",
  message: "Message"
} as const;

function readValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildText(formData: FormData) {
  const lines = Object.entries(fieldLabels).map(([key, label]) => {
    const value = readValue(formData, key);
    return `${label} : ${value || "Non renseigné"}`;
  });

  const document = formData.get("document");
  if (document instanceof File && document.name) {
    lines.push(`Document transmis : ${document.name}`);
  } else {
    lines.push("Document transmis : aucun document joint, à fournir ultérieurement si nécessaire");
  }

  lines.push("Consentement RGPD : oui");
  return lines.join("\n");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const consent = formData.get("consentement");
  const email = readValue(formData, "email");
  const nom = readValue(formData, "nom");
  const prenom = readValue(formData, "prenom");

  if (!nom || !prenom || !email || !consent) {
    return NextResponse.json(
      { error: "Merci de compléter les champs obligatoires et le consentement." },
      { status: 400 }
    );
  }

  const to = process.env.CANDIDATURE_TO_EMAIL || site.email;
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const subject = `Candidature dispositif FSE — ${prenom} ${nom}`;
  const text = buildText(formData);

  if (resendApiKey && from && !to) {
    return NextResponse.json(
      {
        error:
          "L'adresse de destination n'est pas encore configurée. Merci de renseigner CANDIDATURE_TO_EMAIL."
      },
      { status: 500 }
    );
  }

  if (resendApiKey && from && to) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        reply_to: email
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Le message n'a pas pu être transmis. Merci de réessayer ou d'écrire directement à l'adresse indiquée."
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    emailConfigured: Boolean(resendApiKey && from && to),
    destination: to || "Adresse à configurer"
  });
}
