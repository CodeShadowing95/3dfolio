import { projects } from "@/constants";
import { localizePath } from "@/i18n/config";
import { SITE_URL } from "./_shared/metadata";

// Plan du site pour Google (généré au build : /sitemap.xml), chaque page avec sa version anglaise
export const dynamic = "force-static";

const pages = [
  { path: "/", priority: 1 },
  { path: "/labo-ia/", priority: 0.8 },
  { path: "/etude-de-cas/build-ci/", priority: 0.7 },
  ...projects.map((project) => ({ path: `/project/${project.id}/`, priority: 0.6 })),
];

export default function sitemap() {
  return pages.flatMap(({ path, priority }) => {
    const languages = { fr: SITE_URL + path, en: SITE_URL + localizePath(path, "en") };
    return ["fr", "en"].map((locale) => ({
      url: languages[locale],
      changeFrequency: "monthly",
      priority: locale === "fr" ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: { languages },
    }));
  });
}
