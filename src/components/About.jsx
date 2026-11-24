"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useI18n } from "../i18n/I18nProvider";
import { track } from "../utils/analytics";

const Accent = ({ children, tone = "violet" }) => (
  <span className={tone === "cyan" ? "text-cyan font-medium" : "text-accent-light font-medium"}>{children}</span>
);

Accent.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(["violet", "cyan"]),
};

// Présentation : un paragraphe d'accroche, trois points forts et ce que je recherche
const copy = {
  fr: {
    eyebrow: "Introduction",
    title: "Profil.",
    intro: (
      <>
        Développeur full-stack, je viens de terminer mon <Accent>Mastère Expert développement full stack</Accent> à Ynov,
        en alternance. Mon parcours a commencé en 2019 au Cameroun, où j&apos;ai conçu plus de dix applications web métier,
        avant de poursuivre mes études à Lyon puis à Strasbourg.
      </>
    ),
    points: [
      <>De la polyvalence : du front-end au déploiement, en Java/Spring Boot, Node.js, React ou Vue.js selon le projet.</>,
      <>Un réflexe qualité et sécurité acquis en production : CI/CD, mises à jour de dépendances, politiques CSP.</>,
      <>
        Des résultats mesurables : un <Accent tone="cyan">build CI divisé par 5 à 6</Accent> et{" "}
        <Accent tone="cyan">-80 % de traitement manuel</Accent>.
      </>,
      <>
        Un goût pour l&apos;IA générative appliquée : BatiPilote, mon projet de fin d&apos;études, est un copilote IA pour
        les artisans du bâtiment.
      </>,
    ],
    goal: (
      <>
        Je recherche <Accent>un CDI</Accent> dans une équipe où m&apos;investir sur la durée, avec une vision d&apos;ensemble
        du produit. Basé à Strasbourg, ouvert à toute la France, disponible immédiatement.
      </>
    ),
    skills: "Compétences par domaine",
    lab: "Labo IA : mes agents IA au travail",
  },
  en: {
    eyebrow: "Introduction",
    title: "About me.",
    intro: (
      <>
        Full-stack developer, I have just completed my <Accent>Master&apos;s degree in Full-Stack Development</Accent> at
        Ynov, as a work-study programme. My career started in 2019 in Cameroon, where I built more than ten business web
        applications, before continuing my studies in Lyon and then Strasbourg.
      </>
    ),
    points: [
      <>Versatility: from front-end to deployment, in Java/Spring Boot, Node.js, React or Vue.js depending on the project.</>,
      <>A quality and security mindset learned in production: CI/CD, dependency updates, CSP policies.</>,
      <>
        Measurable results: a <Accent tone="cyan">CI build 5 to 6 times faster</Accent> and{" "}
        <Accent tone="cyan">80% less manual processing</Accent>.
      </>,
      <>
        A taste for applied generative AI: BatiPilote, my final-year project, is an AI copilot for construction
        tradespeople.
      </>,
    ],
    goal: (
      <>
        I am looking for <Accent>a permanent full-time role</Accent> in a team I can commit to for the long term, with a
        view of the whole product. Based in Strasbourg, open to roles anywhere in France, available now.
      </>
    ),
    skills: "Skills by area",
    lab: "AI lab: my AI agents at work",
  },
};

const About = () => {
  const { locale, pick, href } = useI18n();
  const text = copy[locale];

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
      <div className="lg:flex-[1_1_44%] min-w-0">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{text.eyebrow}</p>
          <h2 className={styles.sectionHeadText}>{text.title}</h2>
        </motion.div>

        <motion.div variants={fadeIn("", "", 0.1, 1)}>
          <p className="mt-6 text-white-100 text-[17px] sm:text-[18px] font-light leading-[1.7]">{text.intro}</p>
          <ul className="mt-5 flex flex-col gap-3 text-[#dfd9ff] text-[15px] sm:text-[16px] leading-[1.6]">
            {text.points.map((point, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-[9px] w-1.5 h-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-white-100 text-[15px] sm:text-[16px] leading-[1.65]">{text.goal}</p>
          <Link
            href={href("/labo-ia/")}
            onClick={() => track("labo-ia-clic", { emplacement: "profil" })}
            className="group mt-6 inline-flex items-center gap-2.5 min-h-[44px] px-4 rounded-full border border-[#e879f9]/45 bg-[#e879f9]/10 hover:bg-[#e879f9]/20 text-white text-[15px] font-semibold transition-colors"
          >
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#e879f9] shadow-[0_0_8px_#e879f9]" />
            {text.lab}
            <span aria-hidden="true" className="text-[#e879f9] transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>

      <div className="lg:flex-[1_1_56%] min-w-0">
        <h3 className="sr-only">{text.skills}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-[22px]">
          {services.map((service, index) => (
            <motion.div
              key={pick(service.title)}
              variants={fadeIn("up", "spring", 0.1 * index, 0.6)}
              className="bg-tertiary rounded-[20px] border border-white/[0.08] p-5"
            >
              <p className="text-white font-semibold">{pick(service.title)}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {service.items.map((item) => (
                  <li
                    key={pick(item)}
                    className="px-[11px] py-[5px] rounded-full bg-white/5 border border-white/10 text-[#dfd9ff] text-[13px]"
                  >
                    {pick(item)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "profil");
