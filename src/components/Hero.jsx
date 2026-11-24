"use client";

import { Suspense, useCallback, useState } from "react";
import { motion } from "framer-motion";

import { BOOKING_URL } from "../constants";
import { track } from "../utils/analytics";
import useVisitorCompany from "../hooks/useVisitorCompany";
import useMounted from "../hooks/useMounted";
import { HeroCoreCanvas } from "./canvas";
import { HeroCoreFallback } from "./canvas/HeroCore";
import RecruiterPanel from "./RecruiterPanel";
import RoleTitle from "./RoleTitle";
import { useI18n } from "../i18n/I18nProvider";

// Bouton principal en #7c4dff : le blanc sur #915eff n'atteint que 4,0:1 de contraste
export const primaryButton =
  "inline-flex items-center justify-center gap-2.5 min-h-[50px] px-6 rounded-[14px] bg-accent-hover hover:bg-[#6a3cf0] text-white font-semibold text-[16px] shadow-[0_14px_36px_-14px_rgba(145,94,255,0.8)] transition-colors duration-300";
export const secondaryButton =
  "inline-flex items-center justify-center gap-2.5 min-h-[50px] px-6 rounded-[14px] border border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-colors duration-300";

const reveal = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const Hero = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const company = useVisitorCompany();
  const mounted = useMounted();
  const { t } = useI18n();
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const openPanel = () => {
    setPanelOpen(true);
    track("panneau-recruteur-ouvert");
  };

  return (
    <section className="relative w-full">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-[104px] lg:pt-[120px] flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8">
        <div className="xl:flex-[1_1_56%] min-w-0 flex flex-col gap-5 sm:gap-6">
          {company && (
            <motion.p
              {...reveal(0.3)}
              className="w-fit px-3 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 text-white text-[14px] sm:text-[15px]"
            >
              {t.hero.greeting(company).map((part, i) =>
                i === 1 ? <span key={i} className="font-semibold text-cyan">{part}</span> : part
              )}
            </motion.p>
          )}

          <motion.p
            {...reveal(0)}
            className="inline-flex items-center gap-2.5 w-fit px-4 py-2 rounded-full border border-cyan/40 bg-cyan/10 text-[13px] sm:text-[14px] text-white"
          >
            <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#22d3ee]" aria-hidden="true" />
            {t.common.available}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            className="font-black text-accent text-[42px] xs:text-[52px] sm:text-[68px] lg:text-[76px] leading-[1.04] xl:whitespace-nowrap"
          >
            Patrick NAMEGNI
          </motion.h1>

          <motion.p {...reveal(0.16)} className="font-medium text-[#dfd9ff] text-[21px] sm:text-[26px] lg:text-[32px]">
            <RoleTitle accentClassName="text-accent" />
          </motion.p>

          <motion.p {...reveal(0.24)} className="max-w-[560px] font-light text-white-100 text-[16px] sm:text-[18px] leading-[1.65]">
            {t.hero.tagline}
          </motion.p>

          <motion.div {...reveal(0.32)} className="mt-2 flex flex-col xs:flex-row flex-wrap gap-3.5">
            <a
              href="/CV.pdf"
              download
              onClick={() => track("cv-telecharge", { emplacement: "hero" })}
              className={primaryButton}
            >
              {t.common.downloadCv}
            </a>
            <a
              href="#contact"
              onClick={() => track("contact-clic", { emplacement: "hero" })}
              className={secondaryButton}
            >
              {t.common.contactMe}
            </a>
            {BOOKING_URL && (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="rdv-clic"
                data-umami-event-emplacement="hero"
                className={`${secondaryButton} border-cyan/55 hover:border-cyan hover:bg-cyan/10`}
              >
                {t.common.bookCall}
              </a>
            )}
          </motion.div>

          <motion.button
            {...reveal(0.4)}
            type="button"
            onClick={openPanel}
            className="inline-flex items-center gap-3 w-fit min-h-[44px] text-[15px] text-white-100 hover:text-white group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan/15 text-cyan" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
              </svg>
            </span>
            <span>
              {t.hero.recruiter}{" "}
              <span className="underline decoration-cyan/60 underline-offset-[5px] group-hover:decoration-cyan">
                {t.hero.recruiterLink}
              </span>
            </span>
          </motion.button>
        </div>

        {/* Noyau 3D : sous le texte jusqu'à 1280 px, à droite au-delà */}
        <div className="xl:flex-[1_1_44%] min-w-0 h-[300px] sm:h-[440px] xl:h-[600px]">
          {mounted ? (
            <Suspense fallback={<HeroCoreFallback />}>
              <HeroCoreCanvas />
            </Suspense>
          ) : (
            <HeroCoreFallback />
          )}
        </div>
      </div>

      <div className="relative z-10 hidden sm:flex justify-center pt-2 pb-10">
        <a
          href="#profil"
          aria-label={t.hero.scrollDown}
          className="w-[34px] h-[60px] rounded-[20px] border-[3px] border-secondary flex justify-center pt-2.5 box-border"
        >
          <motion.span
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-secondary"
          />
        </a>
      </div>

      <RecruiterPanel open={panelOpen} onClose={closePanel} />
    </section>
  );
};

export default Hero;
