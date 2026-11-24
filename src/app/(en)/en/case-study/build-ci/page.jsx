import CaseStudyCI from "@/views/CaseStudyCI";
import { alternates } from "@/app/_shared/metadata";

export const metadata = {
  title: "Case study: a CI build 5× faster",
  description:
    "How the Hapticmedia corporate website's CI build went from 25-30 minutes to about 5 minutes: Strapi request caching, image optimisation, parallel downloads.",
  alternates: alternates("/etude-de-cas/build-ci/", "en"),
};

export default function Page() {
  return <CaseStudyCI />;
}
