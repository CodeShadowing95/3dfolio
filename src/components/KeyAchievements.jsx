"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { styles } from "../styles";
import { keyAchievements } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useI18n } from "../i18n/I18nProvider";

const KeyAchievements = () => {
  const { t, href, pick, locale } = useI18n();
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="max-w-7xl mx-auto px-6 sm:px-12 pt-6 pb-16 sm:pb-20 relative z-10"
    >
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t.achievements.eyebrow}</p>
        <h2 className={styles.sectionHeadText}>{t.achievements.title}</h2>
      </motion.div>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {keyAchievements.map((achievement, index) => {
          const highlighted = Boolean(achievement.link);
          return (
            <motion.article
              key={achievement.value}
              variants={fadeIn("up", "spring", 0.15 * index, 0.75)}
              className={`relative rounded-[20px] p-[26px] flex flex-col transition-colors ${
                highlighted
                  ? // Bordure en dégradé de la charte (cyan vers violet)
                    "border border-transparent [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]"
                  : "bg-tertiary border border-white/[0.08]"
              }`}
            >
              <p className="text-[40px] font-black text-white leading-none">{(locale === "en" && achievement.valueEn) || achievement.value}</p>
              <p className="mt-3 text-secondary text-[15px] leading-[1.55]">{pick(achievement.label)}</p>
              {achievement.link && (
                // Toute la carte est cliquable grâce au pseudo-élément du lien
                <Link
                  href={href(achievement.link.to)}
                  className="mt-4 text-cyan text-[14px] font-semibold hover:underline after:absolute after:inset-0 after:rounded-[20px]"
                >
                  {pick(achievement.link.label)} →
                </Link>
              )}
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default KeyAchievements;
