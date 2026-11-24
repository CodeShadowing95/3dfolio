import CaseStudyCI from "@/views/CaseStudyCI";
import { alternates } from "@/app/_shared/metadata";

export const metadata = {
  title: "Étude de cas : un build CI divisé par 5",
  description:
    "Comment le build CI du site corporate Hapticmedia est passé de 25-30 minutes à environ 5 minutes : cache des requêtes Strapi, optimisation des images, téléchargements parallélisés.",
  alternates: alternates("/etude-de-cas/build-ci/", "fr"),
};

export default function Page() {
  return <CaseStudyCI />;
}
