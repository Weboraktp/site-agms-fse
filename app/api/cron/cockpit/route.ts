import { createHash, timingSafeEqual } from "node:crypto";
import { retryPendingTransmissions } from "@/lib/preinscription-server";

/**
 * Rattrapage planifié des demandes non arrivées au cockpit de l'AGMS (vercel.json : une fois par
 * jour). Vercel appelle cette route avec l'en-tête « Authorization: Bearer CRON_SECRET » ; sans
 * cette variable, la route reste fermée. Elle ne renvoie et ne journalise que des nombres.
 *
 * Ce qui est repris : voir shouldRetryAutomatically (lib/cockpit.ts). L'historique d'avant le
 * raccordement et les demandes de plus de 14 jours se transmettent à la main, depuis /admin.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return Response.json({ ok: false, erreur: "Rattrapage fermé : CRON_SECRET absente." }, { status: 503 });
  }
  const received = request.headers.get("authorization") ?? "";
  if (!timingSafeEqual(sha256(received), sha256(`Bearer ${secret}`))) {
    return Response.json({ ok: false, erreur: "Accès réservé." }, { status: 401 });
  }

  try {
    const run = await retryPendingTransmissions();
    if (!run.ready) {
      return Response.json({ ok: true, relie: false, non_transmises: null, essais: 0, transmises: 0 });
    }
    const remaining = run.pending - run.sent;
    if (remaining > 0) {
      console.error("[cockpit] demandes non transmises après le rattrapage", {
        restantes: remaining,
        a_reprendre: run.candidates,
        essais: run.tried,
        transmises: run.sent
      });
    }
    return Response.json({
      ok: true,
      relie: true,
      non_transmises: remaining,
      essais: run.tried,
      transmises: run.sent
    });
  } catch (error) {
    console.error("[cockpit] rattrapage impossible", { code: error instanceof Error ? error.name : "inconnu" });
    return Response.json({ ok: false, erreur: "Rattrapage impossible." }, { status: 500 });
  }
}
