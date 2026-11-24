"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useI18n } from "../i18n/I18nProvider";

const copy = {
  fr: { eyebrow: "Mon parcours", title: "Expérience.", stack: "Stack" },
  en: { eyebrow: "My journey", title: "Experience.", stack: "Stack" },
};

// Une étape de la frise : logo rond sur la ligne, carte à droite
const ExperienceCard = ({ experience, index }) => {
  const { locale, href, pick } = useI18n();
  const c = copy[locale];

  return (
    <motion.li
      variants={fadeIn("up", "spring", 0.1 * index, 0.6)}
      className="grid grid-cols-1 sm:grid-cols-[56px_1fr] sm:gap-6"
    >
      <img
        src={experience.icon}
        alt={experience.company_name}
        loading="lazy"
        width={56}
        height={56}
        className="hidden sm:block relative w-14 h-14 rounded-full bg-[#383E56] object-contain border-2"
        style={{ borderColor: experience.ringColor }}
      />
      <article
        className={`min-w-0 rounded-[20px] p-5 sm:p-7 border ${
          experience.highlight
            ? "border-transparent [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]"
            : "bg-tertiary border-white/[0.08]"
        }`}
      >
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-3">
          <div className="min-w-0 flex items-start gap-3">
            {/* Téléphone : pas de frise, le logo passe dans la carte pour lui laisser toute la largeur */}
            <img
              src={experience.icon}
              alt=""
              loading="lazy"
              width={40}
              height={40}
              className="sm:hidden w-10 h-10 shrink-0 rounded-full bg-[#383E56] object-contain border-2"
              style={{ borderColor: experience.ringColor }}
            />
            <div className="min-w-0">
            <h3 className="text-white text-[20px] sm:text-[22px] font-bold leading-tight">{pick(experience.title)}</h3>
            <p className="mt-1 text-secondary text-[15px]">
              {experience.company_name} · {pick(experience.location)}
            </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-full text-[13px] text-[#dfd9ff] bg-white/5 border border-white/10">
            {pick(experience.date)}
          </span>
        </div>

        <ul className="mt-4 pl-[18px] list-disc flex flex-col gap-2 text-[15px] leading-[1.6] text-[#dfd9ff] marker:text-accent-light">
          {experience.points.map((point, i) => (
            <li key={i}>{pick(point)}</li>
          ))}
        </ul>

        {experience.stack && (
          <p className="mt-4 font-mono text-[12.5px] leading-[1.7] text-secondary">
            <span className="text-cyan">{c.stack} ·</span> {experience.stack}
          </p>
        )}

        {experience.caseStudy && (
          <Link
            href={href(experience.caseStudy.to)}
            className="mt-3 inline-flex min-h-[44px] items-center font-semibold text-cyan hover:text-accent-light"
          >
            {pick(experience.caseStudy.label)} →
          </Link>
        )}
      </article>
    </motion.li>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.object.isRequired,
    company_name: PropTypes.string.isRequired,
    location: PropTypes.object,
    date: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    ringColor: PropTypes.string,
    highlight: PropTypes.bool,
    stack: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    caseStudy: PropTypes.shape({ to: PropTypes.string, label: PropTypes.object }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Experience = () => {
  const { locale } = useI18n();
  const c = copy[locale];
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{c.eyebrow}</p>
        <h2 className={styles.sectionHeadText}>{c.title}</h2>
      </motion.div>

      <div className="relative mt-11">
        {/* Ligne de la frise, du cyan au violet, qui s'efface en bas */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-[27px] top-5 bottom-5 w-0.5 bg-[linear-gradient(#22d3ee,#804dee,rgba(128,77,238,0))]"
        />
        <ol className="relative flex flex-col gap-5 sm:gap-[22px]">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company_name} experience={experience} index={index} />
          ))}
        </ol>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "expérience");
