"use client";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { education, languages } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useI18n } from "../i18n/I18nProvider";

const copy = {
  fr: { eyebrow: "Diplômes", title: "Formation.", langEyebrow: "Langues", langTitle: "Je parle." },
  en: { eyebrow: "Degrees", title: "Education.", langEyebrow: "Languages", langTitle: "I speak." },
};

// Formation (3 diplômes) et langues, côte à côte sur grand écran
const Education = () => {
  const { locale, pick } = useI18n();
  const c = copy[locale];
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-6">
      <div className="lg:flex-[2] min-w-0">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{c.eyebrow}</p>
          <h2 className={styles.sectionHeadText}>{c.title}</h2>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {education.map((item, index) => (
            <motion.article
              key={item.years}
              variants={fadeIn("up", "spring", 0.12 * index, 0.6)}
              className="bg-tertiary rounded-[20px] p-[22px] border border-white/[0.08] flex flex-col items-start"
            >
              {item.note?.fr === "Major de promotion" ? (
                <span className="px-3 py-1.5 rounded-full text-[13px] text-cyan bg-white/5 border border-cyan/40">
                  {pick(item.note)}
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full text-[13px] text-[#dfd9ff] bg-white/5 border border-white/10">
                  {item.years} · {pick(item.level)}
                </span>
              )}
              <h3 className="mt-3.5 text-white font-semibold leading-[1.4]">{pick(item.degree)}</h3>
              <p className="mt-1.5 text-[14px] text-secondary">
                {pick(item.school)}
                {item.note?.fr === "Major de promotion" ? ` · ${item.years}` : item.note ? ` · ${pick(item.note)}` : ""}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.div variants={fadeIn("up", "spring", 0.3, 0.6)} className="lg:flex-1 min-w-0 lg:max-w-[360px]">
        <p className={styles.sectionSubText}>{c.langEyebrow}</p>
        <h2 className="mt-2 text-white font-black text-[clamp(28px,3vw,40px)] leading-[1.08]">{c.langTitle}</h2>
        <ul className="mt-7 bg-tertiary rounded-[20px] p-[22px] border border-white/[0.08] flex flex-col gap-3.5">
          {languages.map((language) => (
            <li key={language.name.fr} className="flex justify-between gap-4">
              <span className="text-white font-medium">{pick(language.name)}</span>
              <span className="text-secondary">{pick(language.level)}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Education, "formation");
