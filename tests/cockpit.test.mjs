// Transmission au cockpit : corps envoyé, longueurs, essais. Données fictives, aucun appel réseau
// (fetch est remplacé). Lancer : npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildCockpitPayload,
  isBeyondCockpitEmailWindow,
  sendToCockpit,
  shouldRetryAutomatically,
  truncate
} from "../lib/cockpit.ts";

const record = {
  id: "3f0c2a4e-6f0b-4c53-9d0e-2f6a5b1c7d10",
  createdAt: "2026-11-13T15:04:05.678Z",
  firstName: "Maëlle",
  lastName: "Exemple",
  birthDate: "2008-03-14",
  email: "maelle.exemple@example.org",
  phone: "0690 00 00 00",
  address: "1 rue des Essais",
  postalCode: "97100",
  city: "Basse-Terre",
  situation: "Lycéen·ne en Terminale",
  school: "Lycée fictif de Baimbridge",
  discipline: "SVT",
  scholarship: "Oui",
  scholarshipLevel: "5",
  bacMentionStatus: "Visée cette année",
  bacMention: "Bien",
  emergencyName: "Parent Exemple",
  emergencyRelation: "Mère",
  emergencyPhone: "0690 11 11 11",
  imageRights: "Je refuse",
  whatsappGroup: true,
  message: "Plutôt joignable après 17 h."
};

const limits = { prenom: 80, nom: 80, email: 160, telephone: 40, objet: 200, message: 4000, details: 2000 };

/** La réponse du cockpit pour ce code : son accusé habituel en 200 et 201, une erreur sinon. */
function response(status) {
  const body =
    status < 300
      ? { ok: true, deja: status === 200, opportunite_id: null, confirmation: null, messages_automatiques: false }
      : { ok: false, erreur: "refus" };
  return new Response(JSON.stringify(body), { status });
}

/** Faux fetch : rejoue les réponses données (un code, une erreur, ou une fonction qui rend une Response), garde les appels reçus. */
function fakeFetch(...steps) {
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url, init });
    const step = steps[Math.min(calls.length - 1, steps.length - 1)];
    if (step instanceof Error) throw step;
    return typeof step === "function" ? step() : response(step);
  };
  return { fetch, calls };
}

const options = (fake, extra = {}) => ({
  url: "https://cockpit.example.test/",
  key: "cle-de-test",
  fetch: fake.fetch,
  wait: async (ms) => void (extra.waits ?? []).push(ms),
  ...extra
});

test("le corps suit le contrat du cockpit", () => {
  assert.deepEqual(buildCockpitPayload(record), {
    id: record.id,
    type: "pre_inscription",
    formation_code: "PREPA_PASS_LAS",
    recu_le: "2026-11-13T15:04:05.678Z",
    prenom: "Maëlle",
    nom: "Exemple",
    email: "maelle.exemple@example.org",
    telephone: "0690 00 00 00",
    // Le cockpit ne garde pas `structure` pour une pré-inscription : l'établissement part dans les détails.
    structure: null,
    objet: "Pré-inscription · Dispositif AGMS (FSE+)",
    message: "Plutôt joignable après 17 h.",
    details: [
      "Situation : Lycéen·ne en Terminale",
      "Établissement : Lycée fictif de Baimbridge",
      "Discipline envisagée : SVT",
      "Boursier·ère : Oui",
      "Mention au bac : Visée cette année · Bien",
      "Dossier complet : espace admin du site du dispositif"
    ].join("\n"),
    whatsapp: false
  });
});

test("ce qui reste sur le site ne part pas", () => {
  const sent = JSON.stringify(buildCockpitPayload(record));
  for (const kept of [
    record.birthDate,
    record.address,
    record.postalCode,
    record.city,
    record.emergencyName,
    record.emergencyRelation,
    record.emergencyPhone,
    record.imageRights,
    "échelon",
    "WhatsApp"
  ]) {
    assert.equal(sent.includes(kept), false, `« ${kept} » ne doit pas être transmis`);
  }
  assert.equal(/"whatsapp":false/.test(sent), true);
});

test("une pré-inscription d'avant le 12 novembre (sans dossier) reste transmissible", () => {
  const old = {
    id: record.id,
    createdAt: record.createdAt,
    firstName: "Noa",
    lastName: "Ancien",
    email: "noa@example.org",
    phone: "0690000000",
    situation: "En réorientation",
    school: "",
    message: ""
  };
  const payload = buildCockpitPayload(old);
  assert.equal(payload.structure, null);
  assert.equal(payload.message, null);
  assert.equal(
    payload.details,
    "Situation : En réorientation\nDossier complet : espace admin du site du dispositif"
  );
});

test("aucun champ ne dépasse la longueur acceptée", () => {
  const long = "é".repeat(5000);
  const payload = buildCockpitPayload({
    ...record,
    firstName: long,
    lastName: long,
    phone: "0".repeat(300),
    school: long,
    situation: long,
    discipline: long,
    scholarship: long,
    bacMentionStatus: long,
    bacMention: long,
    message: `${"mot ".repeat(2000)}fin`
  });
  for (const [name, max] of Object.entries(limits)) {
    const value = payload[name];
    assert.ok(value === null || value.length <= max, `${name} : ${value?.length} > ${max}`);
  }
  assert.equal(payload.nom.length, 80);
  assert.ok(payload.message.endsWith("mot…"), "le message est coupé entre deux mots");
});

test("une coupe ne casse ni un mot ni un émoji", () => {
  assert.equal(truncate("court", 10), "court");
  assert.equal(truncate("un deux trois quatre cinq", 20), "un deux trois…");
  const cut = truncate("😀".repeat(50), 10);
  assert.ok(cut.length <= 10);
  assert.equal(cut.isWellFormed(), true);
});

test("caractères refusés par une base de données, retours à la ligne", () => {
  const payload = buildCockpitPayload({
    ...record,
    lastName: "  Exem\u0000ple\r\n ",
    school: "Lycée\nfictif",
    message: "Ligne 1\r\nLigne 2\u0007 \uD83D"
  });
  assert.equal(payload.nom, "Exemple");
  assert.equal(payload.structure, null);
  assert.ok(payload.details.split("\n").includes("Établissement : Lycée fictif"));
  assert.equal(payload.message, "Ligne 1\nLigne 2");
});

test("une adresse que le cockpit refuserait ne fait pas perdre la demande", () => {
  const payload = buildCockpitPayload({ ...record, email: "maëlle@exemple.org" });
  assert.equal(payload.email, null);
  assert.ok(payload.details.includes("E-mail à vérifier : maëlle@exemple.org"));
});

test("sans nom, rien n'est construit ni envoyé", async () => {
  assert.equal(buildCockpitPayload({ ...record, lastName: "   " }), null);
  const fake = fakeFetch(201);
  assert.deepEqual(await sendToCockpit({ ...record, lastName: "" }, options(fake)), {
    ok: false,
    code: "nom_absent",
    attempts: 0
  });
  assert.equal(fake.calls.length, 0);
});

test("une date de réception douteuse est omise", () => {
  assert.equal("recu_le" in buildCockpitPayload({ ...record, createdAt: "hier" }), false);
});

test("201 : créée au premier essai, bonne adresse, bonne clé", async () => {
  const fake = fakeFetch(201);
  const result = await sendToCockpit(record, options(fake));
  assert.deepEqual(result, { ok: true, already: false, attempts: 1, automated: false });
  assert.equal(fake.calls.length, 1);
  const { url, init } = fake.calls[0];
  assert.equal(url, "https://cockpit.example.test/api/webhooks/site");
  assert.equal(init.method, "POST");
  assert.equal(init.headers["x-site-key"], "cle-de-test");
  assert.equal(init.redirect, "manual");
  assert.deepEqual(JSON.parse(init.body), buildCockpitPayload(record));
});

test("200 : déjà reçue (appel idempotent)", async () => {
  const result = await sendToCockpit(record, options(fakeFetch(200)));
  assert.deepEqual(result, { ok: true, already: true, attempts: 1, automated: false });
});

test("un 200 qui n'est pas l'accusé du cockpit n'est pas une transmission", async () => {
  const html = () => new Response("<!doctype html><title>Accueil</title>", { status: 200 });
  const refused = () => new Response(JSON.stringify({ ok: false }), { status: 200 });
  const empty = () => new Response(null, { status: 201 });
  const huge = () =>
    new Response(JSON.stringify({ ok: true, messages_automatiques: false, bourrage: "x".repeat(50_000) }), {
      status: 201
    });
  for (const answer of [html, refused, empty, huge]) {
    const fake = fakeFetch(answer, 201);
    assert.deepEqual(await sendToCockpit(record, options(fake)), {
      ok: false,
      code: "reponse_inattendue",
      attempts: 1
    });
    assert.equal(fake.calls.length, 1, "pas de nouvel essai : c'est l'adresse qu'il faut vérifier");
  }
});

test("le cockpit qui ne confirme pas « aucun message automatique » est signalé", async () => {
  const announced = () =>
    new Response(JSON.stringify({ ok: true, deja: false, messages_automatiques: true }), { status: 201 });
  const silent = () => new Response(JSON.stringify({ ok: true, deja: false }), { status: 201 });
  for (const answer of [announced, silent]) {
    assert.deepEqual(await sendToCockpit(record, options(fakeFetch(answer))), {
      ok: true,
      already: false,
      attempts: 1,
      automated: true
    });
  }
});

test("400, 401, 404 et redirection : un seul essai", async () => {
  for (const status of [400, 401, 404, 308]) {
    const fake = fakeFetch(status, 201);
    const result = await sendToCockpit(record, options(fake));
    assert.deepEqual(result, { ok: false, code: `http_${status}`, attempts: 1 });
    assert.equal(fake.calls.length, 1);
  }
});

test("5xx puis succès : nouvel essai après une attente croissante", async () => {
  const waits = [];
  const fake = fakeFetch(503, 500, 201);
  const result = await sendToCockpit(record, options(fake, { waits }));
  assert.deepEqual(result, { ok: true, already: false, attempts: 3, automated: false });
  assert.deepEqual(waits, [1000, 3000]);
  assert.equal(new Set(fake.calls.map((call) => call.init.body)).size, 1, "même corps, même identifiant");
});

test("erreur réseau ou délai dépassé : trois essais, puis on renonce", async () => {
  const network = fakeFetch(new TypeError("fetch failed"));
  assert.deepEqual(await sendToCockpit(record, options(network)), { ok: false, code: "reseau", attempts: 3 });
  assert.equal(network.calls.length, 3);

  const timeout = fakeFetch(new DOMException("The operation timed out", "TimeoutError"));
  assert.deepEqual(await sendToCockpit(record, options(timeout)), { ok: false, code: "delai", attempts: 3 });

  const down = fakeFetch(503);
  assert.deepEqual(await sendToCockpit(record, options(down)), { ok: false, code: "http_503", attempts: 3 });
});

test("sans adresse, sans clé ou en http : aucun appel", async () => {
  for (const extra of [{ url: "" }, { key: "" }, { url: "http://cockpit.example.test" }, { url: "pas une adresse" }]) {
    const fake = fakeFetch(201);
    const result = await sendToCockpit(record, options(fake, extra));
    assert.deepEqual(result, { ok: false, code: "non_relie", attempts: 0 });
    assert.equal(fake.calls.length, 0);
  }
});

test("rien de personnel dans le résultat (seul lui est journalisé)", async () => {
  const result = await sendToCockpit(record, options(fakeFetch(new Error(`échec pour ${record.email}`))));
  const logged = JSON.stringify(result);
  for (const value of [record.email, record.lastName, record.phone]) {
    assert.equal(logged.includes(value), false);
  }
});

const now = new Date("2026-11-13T15:00:00Z");
const ago = (ms) => new Date(now.getTime() - ms).toISOString();
const minute = 60_000;
const day = 86_400_000;

test("au-delà de 14 jours, le cockpit ne prévient plus personne : l'admin le signale", () => {
  assert.equal(isBeyondCockpitEmailWindow(ago(2 * day), now), false);
  assert.equal(isBeyondCockpitEmailWindow(ago(13 * day), now), false);
  assert.equal(isBeyondCockpitEmailWindow(ago(14 * day - 30 * minute), now), true, "marge d'une heure");
  assert.equal(isBeyondCockpitEmailWindow(ago(39 * day), now), true);
  assert.equal(isBeyondCockpitEmailWindow("date illisible", now), true);
});

test("rattrapage planifié : ce qui repart tout seul, ce qui attend une personne", () => {
  const retry = (createdAt, cockpit) => shouldRetryAutomatically({ createdAt, cockpit }, now);

  // Échecs récents qu'un nouvel essai peut lever, y compris une clé ou une adresse corrigée.
  for (const code of ["reseau", "delai", "http_500", "http_503", "http_401", "http_404", "reponse_inattendue"]) {
    assert.equal(retry(ago(3 * day), { status: "erreur", code }), true, code);
  }
  // Refus qui tient à la demande : la renvoyer telle quelle ne change rien.
  for (const code of ["http_400", "nom_absent", "http_413", "http_422"]) {
    assert.equal(retry(ago(3 * day), { status: "erreur", code }), false, code);
  }
  // Déjà transmise.
  assert.equal(retry(ago(day), { status: "transmise" }), false);
  // Plus de 14 jours : le cockpit l'enregistrerait sans e-mail, on laisse la main à l'équipe.
  assert.equal(retry(ago(20 * day), { status: "erreur", code: "reseau" }), false);
  // Sans état : seulement si elle est récente (envoi interrompu), jamais l'historique d'avant le raccordement.
  assert.equal(retry(ago(2 * minute), undefined), false, "l'envoi qui suit le dépôt est peut-être en cours");
  assert.equal(retry(ago(3 * 3_600_000), undefined), true);
  assert.equal(retry(ago(5 * day), undefined), false);
  assert.equal(retry(ago(39 * day), undefined), false);
});
