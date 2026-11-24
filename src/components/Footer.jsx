"use client";

import Link from "next/link";

import { useI18n } from "../i18n/I18nProvider";
import { track } from "../utils/analytics";
import { LINKEDIN_URL } from "./Contact";
import { CV_FILES } from "./CvDownload";
import BrandMark from "./BrandMark";

const GITHUB_URL = "https://github.com/CodeShadowing95";

const copy = {
  fr: { nav: "Liens du pied de page", projects: "Projets", caseStudy: "Étude de cas", cv: "CV" },
  en: { nav: "Footer links", projects: "Projects", caseStudy: "Case study", cv: "Résumé" },
};

const linkClass = "text-[#dfd9ff] hover:text-white transition-colors inline-flex min-h-[44px] items-center";

// Pied de page : monogramme, mention et liens utiles
const Footer = () => {
  const { locale, href } = useI18n();
  const c = copy[locale];
  const year = 2026;

  return (
    <footer className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-6 pb-24 sm:pb-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08]">
      <div className="flex items-center gap-3">
        <BrandMark size={36} />
        <span className="text-[14px] text-secondary">© {year} Patrick Namegni · patrktech.com</span>
      </div>
      <nav aria-label={c.nav} className="flex flex-wrap gap-x-[22px] text-[14px]">
        <a href={`${href("/")}#projets`} className={linkClass}>
          {c.projects}
        </a>
        <Link href={href("/etude-de-cas/build-ci")} className={linkClass}>
          {c.caseStudy}
        </Link>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" data-umami-event="github-clic" className={linkClass}>
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="linkedin-clic"
          data-umami-event-emplacement="footer"
          className={linkClass}
        >
          LinkedIn
        </a>
        <a
          href={CV_FILES[locale].pack}
          download
          onClick={() => track("cv-telecharge", { emplacement: "footer", langue: locale, contenu: "cv+lettre" })}
          className={linkClass}
        >
          {c.cv}
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
