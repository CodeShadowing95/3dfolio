import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, linkedin, github } from "../assets";
import { track } from "../utils/analytics";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/frank-patrick-namegni/",
    label: "Profil LinkedIn de Patrick Namegni",
    icon: linkedin,
    name: "LinkedIn",
    event: "linkedin-clic",
  },
  {
    href: "https://github.com/CodeShadowing95",
    label: "Profil GitHub de Patrick Namegni",
    icon: github,
    name: "GitHub",
    event: "github-clic",
  },
];

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
  </svg>
);

const Navbar = () => {
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
            setActive(link.title);
          } else {
            setActive((current) => (current === link.title ? "" : current));
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
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 ${
        isScrolled || toggle ? "bg-primary/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="" className="w-9 h-9 object-contain" />
          <p className="ml-2 text-white text-[18px] font-bold whitespace-nowrap">
            Patrick <span className="sm:inline hidden">Namegni</span>
          </p>
        </Link>

        {/* Barre complète à partir de 1024 px */}
        <ul className="list-none hidden lg:flex flex-row items-center gap-7 xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.title)}
                className={`relative py-1 text-[16px] font-medium transition-colors duration-300 hover:text-white ${
                  active === link.title ? "text-white" : "text-secondary"
                }`}
              >
                {link.title}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 w-full rounded-full bg-accent transition-transform duration-300 origin-left ${
                    active === link.title ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}

          {/* <li>
            <a
              href="/CV.pdf"
              download
              onClick={() => track("cv-telecharge", { emplacement: "navbar" })}
              className="flex items-center gap-2 px-4 py-2 border border-white/50 hover:border-white hover:bg-white/10 text-white font-medium text-[15px] rounded-lg transition-colors duration-300 whitespace-nowrap"
            >
              <DownloadIcon />
              <span className="hidden xl:inline">Télécharger mon CV</span>
              <span className="xl:hidden">CV</span>
            </a>
          </li> */}

          <li className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-umami-event={social.event}
                data-umami-event-emplacement="navbar"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <img src={social.icon} alt="" className="w-6 h-6 object-contain" />
              </a>
            ))}
          </li>
        </ul>

        {/* Bouton du menu sous 1024 px */}
        <button
          type="button"
          className="lg:hidden p-1 -mr-1"
          aria-label={toggle ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={toggle}
          aria-controls="mobile-menu"
          onClick={() => setToggle((open) => !open)}
        >
          <img src={toggle ? close : menu} alt="" className="w-[28px] h-[28px] object-contain" />
        </button>
      </div>

      <AnimatePresence>
        {toggle && (
          <>
            {/* Voile : un tap à côté ferme le menu */}
            <motion.div
              key="backdrop"
              className="lg:hidden fixed inset-0 top-[76px] -z-10 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setToggle(false)}
              aria-hidden="true"
            />

            <motion.div
              key="panel"
              id="mobile-menu"
              className={`lg:hidden absolute top-full inset-x-0 ${styles.paddingX} pb-8 pt-4 bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-card`}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <p className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-cyan/30 bg-cyan/10 text-[13px] text-white-100">
                  <span className="w-2 h-2 rounded-full bg-cyan" aria-hidden="true" />
                  Disponible immédiatement · CDI
                </p>

                <ul className="list-none flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={() => {
                          setActive(link.title);
                          setToggle(false);
                        }}
                        className={`flex items-center gap-3 py-2.5 text-[20px] font-semibold transition-colors duration-300 ${
                          active === link.title ? "text-white" : "text-secondary hover:text-white"
                        }`}
                      >
                        <span
                          className={`h-5 w-1 rounded-full ${active === link.title ? "bg-accent" : "bg-white/10"}`}
                          aria-hidden="true"
                        />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <a
                    href="/CV.pdf"
                    download
                    onClick={() => {
                      track("cv-telecharge", { emplacement: "menu-mobile" });
                      setToggle(false);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-[15px] transition-colors duration-300"
                  >
                    <DownloadIcon />
                    Télécharger mon CV
                  </a>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-umami-event={social.event}
                      data-umami-event-emplacement="menu-mobile"
                      className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/15 hover:bg-white/10 transition-colors duration-300"
                    >
                      <img src={social.icon} alt="" className="w-6 h-6 object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
