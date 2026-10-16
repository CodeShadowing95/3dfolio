import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

import { BOOKING_URL, keyAchievements, education, languages } from "../constants";
import { track } from "../utils/analytics";

const mainStack = ["Java / Spring Boot", "Node.js / TypeScript", "React / Next.js", "Vue.js / Nuxt"];

const sectionTitle = "text-[12px] uppercase tracking-wider text-secondary";
const chip = "px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white-100 text-[13px]";

// Résumé du profil pour un recruteur pressé : tout l'essentiel sans faire défiler la page
const RecruiterPanel = ({ open, onClose }) => {
  const closeButtonRef = useRef(null);

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

  // Rendu directement dans <body> : aucun conteneur du hero (overflow, z-index, 3D) ne peut le masquer
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-panel-title"
            className="relative w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-tertiary border border-white/10 shadow-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le résumé"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
              </svg>
            </button>

            {/* Identité */}
            <div className="flex items-center gap-4 pr-10">
              <div className="shrink-0 rounded-full p-[2px] bg-gradient-to-br from-cyan to-accent">
                <img src="/avatar.webp" alt="" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div>
                <h2 id="recruiter-panel-title" className="text-white font-black text-[24px] leading-tight">
                  Patrick NAMEGNI
                </h2>
                <p className="text-white-100 font-medium">
                  Développeur <span className="text-accent-light">Full-Stack</span>
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/10 text-[13px] text-white-100">
                <span className="w-2 h-2 rounded-full bg-cyan" aria-hidden="true" />
                Disponible immédiatement · CDI
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[13px] text-white-100">
                Strasbourg · ouvert à toute la France
              </span>
            </div>

            {/* Stack */}
            <div className="mt-6">
              <p className={sectionTitle}>Stack principale</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {mainStack.map((tech) => (
                  <li key={tech} className={chip}>{tech}</li>
                ))}
              </ul>
            </div>

            {/* Chiffres */}
            <div className="mt-6">
              <p className={sectionTitle}>En chiffres</p>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {keyAchievements.slice(0, 3).map((achievement) => (
                  <li key={achievement.value} className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <p className="text-white font-black text-[22px] leading-none">{achievement.value}</p>
                    <p className="mt-1.5 text-secondary text-[12px] leading-5">{achievement.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formation et langues */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div>
                <p className={sectionTitle}>Formation</p>
                <p className="mt-1.5 text-white-100 leading-6">
                  {degree.degree} ({degree.level}), {degree.years}
                </p>
              </div>
              <div>
                <p className={sectionTitle}>Langues</p>
                <p className="mt-1.5 text-white-100 leading-6">
                  {languages.map((lang) => `${lang.name} ${lang.level}`).join(" · ")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="/CV.pdf"
                download
                onClick={() => track("cv-telecharge", { emplacement: "panneau-recruteur" })}
                className="flex-1 text-center px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-[15px] transition-colors"
              >
                Télécharger mon CV
              </a>
              {BOOKING_URL && (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="rdv-clic"
                  data-umami-event-emplacement="panneau-recruteur"
                  className="flex-1 text-center px-5 py-3 rounded-xl border border-cyan/50 hover:bg-cyan/10 text-white font-semibold text-[15px] transition-colors"
                >
                  Réserver un appel de 15 min
                </a>
              )}
              <a
                href="#contact"
                onClick={() => {
                  track("contact-clic", { emplacement: "panneau-recruteur" });
                  onClose();
                }}
                className="flex-1 text-center px-5 py-3 rounded-xl border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-colors"
              >
                Me contacter
              </a>
            </div>

            <a
              href="https://www.linkedin.com/in/frank-patrick-namegni/"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="linkedin-clic"
              data-umami-event-emplacement="panneau-recruteur"
              className="mt-4 inline-block text-[14px] text-secondary hover:text-white transition-colors"
            >
              Voir mon profil LinkedIn →
            </a>
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
