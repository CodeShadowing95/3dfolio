"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { navLinks } from "../constants";
import { linkedin, github } from "../assets";
import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import BrandMark from "./BrandMark";
import { track } from "../utils/analytics";
import CvDownload from "./CvDownload";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/frank-patrick-namegni/",
    labelKey: "linkedinLabel",
    icon: linkedin,
    name: "LinkedIn",
    event: "linkedin-clic",
  },
  {
    href: "https://github.com/CodeShadowing95",
    labelKey: "githubLabel",
    icon: github,
    name: "GitHub",
    event: "github-clic",
  },
];

// Lien vers la formation locale, seulement quand son dossier existe (jamais en ligne)
const hasFormation = process.env.NEXT_PUBLIC_FORMATION === "1";

const Navbar = () => {
  const { t, href } = useI18n();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fond de la barre dès qu'on quitte le haut de page
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Surligne le lien de la section qui occupe le milieu de l'écran
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id)?.closest("section"))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.find(
            (l) => entry.target.contains(document.getElementById(l.id))
          );
          if (!link) return;
          if (entry.isIntersecting) {
            setActive(link.id);
          } else {
            setActive((current) => (current === link.id ? "" : current));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu mobile : Échap pour fermer, page bloquée derrière, fermeture si on repasse en grand écran
  useEffect(() => {
    if (!toggle) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setToggle(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setToggle(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [toggle]);

  return (
    <nav
      aria-label={t.nav.label}
      className={`w-full fixed top-0 z-20 transition-colors duration-300 ${
        isScrolled && !toggle ? "bg-primary/85 backdrop-blur-md border-b border-white/[0.06]" : "border-b border-transparent"
      }`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 lg:py-5 flex justify-between items-center gap-6">
        <Link
          href={href("/")}
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          {/* Logo PN « Bloc » : cube isométrique, P à gauche, N à droite */}
          <BrandMark size={42} />
          <span className="text-white text-[17px] font-bold whitespace-nowrap">Patrick Namegni</span>
        </Link>

        {/* Barre complète à partir de 1024 px */}
        <ul className="list-none hidden lg:flex flex-row items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative py-2.5 px-1 text-[15px] font-medium transition-colors duration-300 hover:text-white ${
                  active === link.id ? "text-white" : "text-[#dfd9ff]"
                }`}
              >
                {t.nav.links[link.id]}
                <span
                  className={`absolute left-1 right-1 bottom-1 h-0.5 rounded-full bg-cyan transition-transform duration-300 origin-left ${
                    active === link.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
          <li>
            <Link
              href={href("/labo-ia/")}
              onClick={() => track("labo-ia-clic", { emplacement: "navbar" })}
              className="inline-flex items-center gap-2 min-h-[36px] px-3.5 rounded-full border border-[#e879f9]/45 bg-[#e879f9]/10 hover:bg-[#e879f9]/20 text-[14px] font-semibold text-white transition-colors"
            >
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#e879f9] shadow-[0_0_8px_#e879f9]" />
              {t.nav.lab}
            </Link>
          </li>
          {hasFormation && (
            <li>
              <Link href="/formation/" className="py-2.5 px-1 text-[15px] font-medium text-cyan hover:text-white transition-colors">
                Cours
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
        <LanguageSwitcher />
        <CvDownload emplacement="navbar" variant="compact" label="CV" showIcon />
        </div>

        {/* Bouton du menu sous 1024 px */}
        <button
          type="button"
          className={`lg:hidden w-11 h-11 rounded-xl border flex items-center justify-center text-white transition-colors ${
            toggle ? "border-cyan/50" : "border-white/15"
          }`}
          aria-label={toggle ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={toggle}
          aria-controls="mobile-menu"
          onClick={() => setToggle((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {toggle ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {toggle && (
          // Menu mobile plein écran : grands liens numérotés, section en cours en cyan
          <motion.div
            key="panel"
            id="mobile-menu"
            className="lg:hidden fixed inset-0 bg-[#0a0b20] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="list-none flex flex-col gap-1 px-6 sm:px-12 pt-[96px]">
              {navLinks.map((link, index) => {
                const isActive = active === link.id;
                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.25 }}
                  >
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        setActive(link.id);
                        setToggle(false);
                      }}
                      className={`flex justify-between items-center min-h-[60px] border-b border-white/[0.08] text-[26px] font-bold transition-colors ${
                        isActive ? "text-cyan" : "text-white hover:text-cyan"
                      }`}
                    >
                      {t.nav.links[link.id]}
                      <span className={`font-mono text-[13px] ${isActive ? "text-cyan" : "text-secondary"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * navLinks.length + 0.05, duration: 0.25 }}
              >
                <Link
                  href={href("/labo-ia/")}
                  onClick={() => {
                    track("labo-ia-clic", { emplacement: "menu-mobile" });
                    setToggle(false);
                  }}
                  className="flex justify-between items-center min-h-[60px] border-b border-white/[0.08] text-[26px] font-bold text-white hover:text-[#e879f9] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    {t.nav.lab}
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#e879f9] shadow-[0_0_10px_#e879f9]" />
                  </span>
                  <span className="font-mono text-[13px] text-[#e879f9]">IA</span>
                </Link>
              </motion.li>
              {hasFormation && (
                <li>
                  <Link
                    href="/formation/"
                    className="flex justify-between items-center min-h-[60px] border-b border-white/[0.08] text-[26px] font-bold text-cyan"
                  >
                    Cours
                    <span className="font-mono text-[13px] text-secondary">local</span>
                  </Link>
                </li>
              )}
            </ul>

            <div className="mt-auto px-6 sm:px-12 pb-7 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 text-[12px] text-white whitespace-nowrap">
                  <span className="w-[7px] h-[7px] rounded-full bg-cyan" aria-hidden="true" />
                  {t.common.available}
                </p>
                <LanguageSwitcher large />
              </div>
              <CvDownload
                emplacement="menu-mobile"
                showIcon
                fullWidth
                onDownload={() => setToggle(false)}
              />
              <div className="flex gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.nav[social.labelKey]}
                    data-umami-event={social.event}
                    data-umami-event-emplacement="menu-mobile"
                    className="flex-1 flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-white/15 text-white text-[14px] hover:bg-white/10 transition-colors"
                  >
                    <img src={social.icon} alt="" className="w-5 h-5 object-contain" />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
