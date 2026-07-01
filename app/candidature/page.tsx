import { redirect } from "next/navigation";
import { site } from "@/lib/content";

export default function CandidaturePage() {
  redirect(site.questionnaireUrl);
}
