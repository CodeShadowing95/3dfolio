"use client";

import { motion } from "framer-motion";

import SkillConstellation from "./SkillConstellation";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useI18n } from "../i18n/I18nProvider";

const copy = {
  fr: {
    eyebrow: "Ce que j'utilise",
    title: "Stack technique.",
    intro:
      "Chaque étoile est une techno, sa taille dit combien de projets et de postes l'utilisent. Choisissez un projet pour voir ses technos s'allumer, ou une étoile pour voir où elle sert.",
  },
  en: {
    eyebrow: "What I use",
    title: "Tech stack.",
    intro:
      "Each star is a technology, its size shows how many projects and jobs use it. Pick a project to light up its stack, or a star to see where it is used.",
  },
};

const Tech = () => {
  const { locale } = useI18n();
  const c = copy[locale];
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className={styles.sectionSubText}>{c.eyebrow}</p>
          <h2 className={styles.sectionHeadText}>{c.title}</h2>
        </div>
        <p className="max-w-[460px] text-[15px] leading-[1.6] text-secondary">{c.intro}</p>
      </motion.div>

      <SkillConstellation />
    </>
  );
};

export default SectionWrapper(Tech, "stack");
