"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

import { BOOKING_URL, keyAchievements, education, languages, experiences } from "../constants";
import { track } from "../utils/analytics";
import useMounted from "../hooks/useMounted";
import { useI18n } from "../i18n/I18nProvider";

const mainStack = ["Java / Spring Boot", "Node.js", "TypeScript", "React / Next.js", "Vue.js / Nuxt", "AWS", "GitHub Actions"];

const copy = {
  fr: {
    title: "Développeur Full-Stack, disponible en CDI",
    availability: "Disponibilité",
    availabilityValue: "Immédiate · CDI",
    degree: "Diplôme",
    lastJob: "Dernier poste",
    languages: "Langues",
    mobility: "Mobilité",
  },
  en: {
    title: "Full-Stack Developer, available for a full-time role",
    availability: "Availability",
    availabilityValue: "Immediately · Full-time",
    degree: "Degree",
    lastJob: "Latest role",
    languages: "Languages",
    mobility: "Location",
  },
};

// Résumé du profil pour un recruteur pressé : tout l'essentiel sans faire défiler la page
const RecruiterPanel = ({ open, onClose }) => {
  const closeButtonRef = useRef(null);
  const mounted = useMounted();
  const { t, pick, locale } = useI18n();

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open, onClose]);

  const degree = education[0];
  const latestJob = experiences[0];

  // Rendu directement dans <body> : aucun conteneur du hero (overflow, z-index, 3D) ne peut le masquer
  // Le panneau vit dans <body> : rien à afficher pendant la génération de la page
  if (!mounted) return null;

  const c = copy[locale];
  const rows = [
    [c.availability, c.availabilityValue],
    [c.degree, locale === "fr" ? `${pick(degree.degree)} (${pick(degree.level)}), Ynov` : `${pick(degree.degree)}, Ynov`],
    [c.lastJob, `${latestJob.company_name}, ${pick(latestJob.title)} (2026)`],
    [c.languages, languages.map((lang, i) => (i === 0 ? pick(lang.name) : `${locale === "fr" ? pick(lang.name).toLowerCase() : pick(lang.name)} ${pick(lang.level)}`)).join(", ")],
    [c.mobility, t.recruiter.mobility],
  ];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex items-end sm:items-stretch sm:justify-end sm:p-6 lg:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-[3px]" onClick={onClose} aria-hidden="true" />

          {/* Téléphone : feuille qui monte du bas ; ordinateur : panneau latéral à droite */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-panel-title"
            className="relative w-full sm:max-w-[560px] max-h-[92vh] sm:max-h-none overflow-y-auto rounded-t-[28px] sm:rounded-[28px] border border-transparent p-6 sm:p-9 flex flex-col gap-[22px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]"
            initial={{ opacity: 0, x: 0, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] font-medium text-cyan">{t.hero.recruiterLink}</p>
                <h2 id="recruiter-panel-title" className="mt-2 text-white font-black text-[26px] sm:text-[30px] leading-[1.15]">
                  {c.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t.recruiter.close}
                className="w-11 h-11 shrink-0 rounded-xl border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <dl className="flex flex-col gap-3">
              {rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-4 gap-y-0.5 text-[15px] leading-[1.5]">
                  <dt className="text-secondary">{label}</dt>
                  <dd className="text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <ul className="grid grid-cols-3 gap-3">
              {keyAchievements.slice(0, 3).map((achievement) => (
                <li key={achievement.value} className="rounded-2xl bg-tertiary p-3 sm:p-4">
                  <p className="text-white font-black text-[20px] sm:text-[26px] leading-none">
                    {(locale === "en" && achievement.valueEn) || achievement.value}
                  </p>
                  <p className="mt-1.5 text-secondary text-[12px] sm:text-[13px] leading-[1.4]">{pick(achievement.label)}</p>
                </li>
              ))}
            </ul>

            <div>
              <p className="text-[12px] uppercase tracking-[0.14em] font-medium text-secondary">{t.recruiter.stack}</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {mainStack.map((tech) => (
                  <li key={tech} className="px-[11px] py-[5px] rounded-full bg-white/5 border border-white/10 text-[#dfd9ff] text-[13px]">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href="/CV.pdf"
                  download
                  onClick={() => track("cv-telecharge", { emplacement: "panneau-recruteur" })}
                  className="flex-1 inline-flex items-center justify-center min-h-[50px] rounded-[14px] bg-[#7c4dff] hover:bg-accent text-white font-semibold transition-colors"
                >
                  {t.common.downloadCv}
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    track("contact-clic", { emplacement: "panneau-recruteur" });
                    onClose();
                  }}
                  className="flex-1 inline-flex items-center justify-center min-h-[50px] rounded-[14px] border border-white/40 hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  {t.common.contactMe}
                </a>
              </div>
              {BOOKING_URL && (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="rdv-clic"
                  data-umami-event-emplacement="panneau-recruteur"
                  className="inline-flex items-center justify-center min-h-[50px] rounded-[14px] border border-cyan/50 hover:bg-cyan/10 text-white font-semibold transition-colors"
                >
                  {t.common.bookCall}
                </a>
              )}
              <a
                href="https://www.linkedin.com/in/frank-patrick-namegni/"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="linkedin-clic"
                data-umami-event-emplacement="panneau-recruteur"
                className="w-fit inline-flex min-h-[44px] items-center text-[14px] text-secondary hover:text-white transition-colors"
              >
                {t.recruiter.linkedin}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

RecruiterPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecruiterPanel;
