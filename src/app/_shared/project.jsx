import { notFound } from "next/navigation";

import WorkDetail from "@/views/WorkDetail";
import { projects } from "@/constants";
import { alternates } from "./metadata";
import { localizeProject } from "@/i18n/localizeProject";
import LegacyProjectRedirect from "@/components/LegacyProjectRedirect";

// Logique commune des pages projet (/project/x/ et /en/project/x/)
// Anciennes adresses de projets renommés : la page redirige vers la nouvelle
// (liens déjà partagés, favoris). Le site étant exporté en statique, pas de redirection serveur.
const LEGACY_IDS = {
  pokedexhub: "pokecraft",
  youwatch: "kmertube",
};

export const projectStaticParams = () => [
  ...projects.map((project) => ({ id: String(project.id) })),
  ...Object.keys(LEGACY_IDS).map((id) => ({ id })),
];

const findProject = (id) => projects.find((project) => String(project.id) === id);

export const projectMetadata = (locale) =>
  async function generateMetadata({ params }) {
    const { id } = await params;
    if (LEGACY_IDS[id]) return { robots: { index: false } };
    const found = findProject(id);
    if (!found) return {};
    const project = localizeProject(found, locale);
    const path = `/project/${project.id}/`;
    const links = alternates(path, locale);

    return {
      title: project.name,
      description: project.description,
      alternates: links,
      openGraph: {
        title: `${project.name} | Patrick Namegni`,
        description: project.description,
        url: links.canonical,
        images: [{ url: project.image }],
      },
      twitter: {
        title: `${project.name} | Patrick Namegni`,
        description: project.description,
        images: [project.image],
      },
    };
  };

export async function ProjectPage({ params }) {
  const { id } = await params;
  if (LEGACY_IDS[id]) return <LegacyProjectRedirect from={id} to={LEGACY_IDS[id]} />;
  if (!findProject(id)) notFound();
  return <WorkDetail id={id} />;
}
