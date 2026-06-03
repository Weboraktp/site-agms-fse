import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const runtime = "nodejs";

const fieldLabels = {
  requestType: "Type de demande",
  nom: "Nom",
  prenom: "Prénom",
  email: "Email",
  telephone: "Téléphone",
  situation: "Situation actuelle",
  formation: "Formation visée ou obtenue",
  boursier: "Boursier",
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
  const requestType = readValue(formData, "requestType") || "Demande dispositif FSE";
  const subject = `${requestType} — ${prenom} ${nom}`;
  const text = buildText(formData);
  const emailConfigured = Boolean(resendApiKey && from && to);

  if (!emailConfigured && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "L'envoi du formulaire n'est pas encore configuré. Merci de réessayer plus tard ou d'écrire directement à l'adresse indiquée."
      },
      { status: 500 }
    );
  }

  if (emailConfigured) {
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
    emailConfigured,
    destination: to || "Adresse à configurer"
  });
}
