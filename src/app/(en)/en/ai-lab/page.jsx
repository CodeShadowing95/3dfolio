import LabIA from "@/views/LabIA";
import { alternates } from "@/app/_shared/metadata";

export const metadata = {
  title: "AI lab: AI agents at work, without giving them the final say",
  description:
    "A self-hosted AI agent system (n8n + Claude) on a Linux server that runs a job search: sorting replies, watching offers, drafting follow-ups, with human approval.",
  alternates: alternates("/labo-ia/", "en"),
};

export default function Page() {
  return <LabIA />;
}
