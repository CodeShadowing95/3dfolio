import LabIA from "@/views/LabIA";
import { alternates } from "@/app/_shared/metadata";

export const metadata = {
  title: "Labo IA : des agents IA au travail, sans leur laisser le dernier mot",
  description:
    "Un système d'agents IA (n8n + Claude) auto-hébergé sur un serveur Linux pour gérer une recherche d'emploi : tri des réponses, veille d'offres, relances, avec validation humaine.",
  alternates: alternates("/labo-ia/", "fr"),
};

export default function Page() {
  return <LabIA />;
}
