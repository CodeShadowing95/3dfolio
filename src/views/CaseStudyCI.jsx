"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
import CvDownload from "../components/CvDownload";

// Étude de cas : optimisation de la CI du site corporate Hapticmedia
const copy = {
  fr: {
    back: "Retour au portfolio",
    eyebrow: "Étude de cas · Hapticmedia · 2026",
    title: "Diviser par 5 le temps de build d'une CI",
    stage: "Durée du build, avant et après",
    before: "Avant",
    after: "Après",
    beforeTime: "25-30 min",
    afterTime: "~5 min",
    segments: ["requêtes Strapi", "images", "téléchargements"],
    sections: [
      {
        title: "Contexte",
        body: "Le site corporate de Hapticmedia, en Nuxt avec un back-office Strapi, est reconstruit par la CI à chaque mise à jour. Le build prenait 25 à 30 minutes, ce qui ralentissait chaque livraison et chaque correction.",
      },
      {
        title: "Diagnostic",
        body: "En découpant la durée du build étape par étape, deux postes ressortaient : les requêtes vers l'API Strapi, refaites pendant la génération des pages, et le traitement des images, repris à chaque build. Les téléchargements de ressources s'enchaînaient en plus les uns après les autres.",
      },
    ],
    actionsTitle: "Actions",
    problem: "Problème",
    solution: "Solution",
    actions: [
      {
        before: "Les mêmes données Strapi redemandées à l'API pendant la génération des pages.",
        after: "Mise en cache des requêtes Strapi pendant le build : chaque donnée n'est demandée qu'une fois.",
      },
      {
        before: "Les images retraitées à chaque build, sans optimisation.",
        after: "Optimisation automatique des images avec SVGO, Sharp et gifsicle, jusqu'à -80 % de poids.",
      },
      {
        before: "Les téléchargements de ressources exécutés un par un.",
        after: "Téléchargements parallélisés.",
      },
    ],
    resultTitle: "Résultat",
    result:
      "Le build est passé de 25-30 minutes à environ 5 minutes, soit 5 à 6 fois plus rapide. Une correction sur le site est désormais en ligne en quelques minutes.",
    stackTitle: "Stack",
    ctaTitle: "Une CI trop lente chez vous ?",
    ctaText: "Je peux en parler en entretien, chiffres à l'appui.",
    contact: "Me contacter",
    cv: "Télécharger mon CV",
  },
  en: {
    back: "Back to portfolio",
    eyebrow: "Case study · Hapticmedia · 2026",
    title: "Making a CI build 5× faster",
    stage: "Build time, before and after",
    before: "Before",
    after: "After",
    beforeTime: "25-30 min",
    afterTime: "~5 min",
    segments: ["Strapi requests", "images", "downloads"],
    sections: [
      {
        title: "Context",
        body: "Hapticmedia's corporate website, built with Nuxt and a Strapi back office, is rebuilt by the CI on every update. The build took 25 to 30 minutes, which slowed down every release and every fix.",
      },
      {
        title: "Diagnosis",
        body: "Breaking the build time down step by step, two items stood out: requests to the Strapi API, repeated while generating the pages, and image processing, redone on every build. On top of that, resource downloads ran one after the other.",
      },
    ],
    actionsTitle: "Actions",
    problem: "Problem",
    solution: "Solution",
    actions: [
      {
        before: "The same Strapi data requested from the API again and again while generating pages.",
        after: "Strapi requests cached during the build: each piece of data is requested only once.",
      },
      {
        before: "Images reprocessed on every build, with no optimisation.",
        after: "Automatic image optimisation with SVGO, Sharp and gifsicle, up to 80% lighter.",
      },
      {
        before: "Resource downloads run one at a time.",
        after: "Downloads run in parallel.",
      },
    ],
    resultTitle: "Result",
    result:
      "The build went from 25-30 minutes to about 5 minutes, 5 to 6 times faster. A fix on the website now goes live within minutes.",
    stackTitle: "Stack",
    ctaTitle: "Is your CI too slow?",
    ctaText: "I'm happy to walk you through it in an interview, with the numbers.",
    contact: "Contact me",
    cv: "Download my résumé",
  },
};

const stack = ["Nuxt", "Strapi", "Node.js", "GitHub Actions", "SVGO", "Sharp", "gifsicle"];

const gradientBorder = "border border-transparent [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]";
const eyebrow = "text-[12px] uppercase tracking-[0.14em] font-medium";
const bodyClass = "text-[17px] leading-[1.75] text-[#dfd9ff] font-light";

const CaseStudyCI = () => {
  const { href, locale } = useI18n();
  const c = copy[locale];
  const reducedMotion = useReducedMotion();

  return (
    <div className="bg-primary min-h-screen text-white-100">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12 pt-8 pb-24">
        <div className="flex justify-between items-center gap-4">
          <Link
            href={href("/#expérience")}
            className="inline-flex items-center gap-2 min-h-[44px] px-[18px] rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white text-[14px] font-semibold transition-colors"
          >
            ← {c.back}
          </Link>
          <LanguageSwitcher />
        </div>

        <p className={`mt-12 text-secondary ${eyebrow} text-[13px]`}>{c.eyebrow}</p>
        <h1 className="mt-2.5 text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.05]">{c.title}</h1>

        {/* Avant / après : la barre « après » se comprime à l'arrivée à l'écran */}
        <section
          aria-label={c.stage}
          className="relative mt-10 rounded-[28px] overflow-hidden border border-white/[0.08] p-6 sm:p-10 bg-[radial-gradient(ellipse_at_30%_30%,#17113f_0%,#070921_70%)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 origin-bottom [transform:perspective(1400px)_rotateX(55deg)_scale(1.6)] [background:linear-gradient(rgba(34,211,238,.07)_1px,transparent_1px)_0_0/40px_40px,linear-gradient(90deg,rgba(34,211,238,.07)_1px,transparent_1px)_0_0/40px_40px]"
          />
          <div className="relative flex flex-col gap-[26px]">
            <div>
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-secondary">{c.before}</span>
                <span className="text-white font-black text-[28px] sm:text-[36px]">{c.beforeTime}</span>
              </div>
              <div className="mt-2.5 h-14 flex gap-1.5" aria-hidden="true">
                {c.segments.map((segment) => (
                  <div
                    key={segment}
                    className="flex-1 min-w-0 rounded-[10px] bg-secondary/20 border border-secondary/35 flex items-center justify-center px-2"
                  >
                    <span className="font-mono text-[11px] sm:text-[12px] leading-tight text-center text-white">{segment}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-cyan">{c.after}</span>
                <span className="text-cyan font-black text-[28px] sm:text-[36px]">{c.afterTime}</span>
              </div>
              <div className="mt-2.5 h-14" aria-hidden="true">
                <motion.div
                  className="h-full rounded-[10px] bg-[linear-gradient(135deg,#22d3ee,#804dee)] shadow-[0_0_40px_rgba(34,211,238,0.35)]"
                  initial={{ width: "100%" }}
                  whileInView={{ width: "18%" }}
                  viewport={{ once: true, amount: 0.8 }}
                  // Moins d'animations demandé : la barre prend directement sa taille finale
                  transition={reducedMotion ? { duration: 0 } : { duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14 flex flex-col gap-11">
          {c.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-white text-[24px] font-bold">{section.title}</h2>
              <p className={bodyClass}>{section.body}</p>
            </section>
          ))}

          <section>
            <h2 className="mb-3 text-white text-[24px] font-bold">{c.actionsTitle}</h2>
            <ol className="flex flex-col gap-3.5">
              {c.actions.map((action) => (
                <li key={action.after} className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="bg-tertiary border border-white/[0.08] rounded-[20px] p-5">
                    <p className={`${eyebrow} text-secondary`}>{c.problem}</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#dfd9ff]">{action.before}</p>
                  </div>
                  <div className={`rounded-[20px] p-5 ${gradientBorder}`}>
                    <p className={`${eyebrow} text-cyan`}>{c.solution}</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-white">{action.after}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-white text-[24px] font-bold">{c.resultTitle}</h2>
            <p className={bodyClass}>{c.result}</p>
          </section>

          <section>
            <h2 className="mb-3 text-white text-[18px] font-bold">{c.stackTitle}</h2>
            <ul className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <li key={item} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#dfd9ff] text-[13px]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={`mt-16 rounded-3xl p-7 sm:p-9 flex flex-wrap justify-between items-center gap-5 ${gradientBorder}`}>
          <div>
            <p className="text-white text-[22px] sm:text-[24px] font-extrabold">{c.ctaTitle}</p>
            <p className="mt-1.5 text-secondary">{c.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={href("/#contact")}
              className="inline-flex items-center min-h-[50px] px-[26px] rounded-[14px] bg-[#7c4dff] hover:bg-accent text-white font-semibold transition-colors"
            >
              {c.contact}
            </Link>
            <CvDownload emplacement="etude-de-cas" variant="outline" label={c.cv} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyCI;
