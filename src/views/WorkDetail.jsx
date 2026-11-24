"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion } from "framer-motion";
import { useProjects } from "../i18n/projects";
import { getTechInfo } from "../constants/tech";
import { ArrowLeftIcon, ChevronIcon, ShareIcon, DemoIcon, GithubIcon } from "../components/workdetail/icons";
import { TechBadge } from "../components/workdetail/parts";
import Gallery from "../components/workdetail/Gallery";
import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";

// Une démo n'existe que si le lien mène ailleurs que le dépôt de code
const hasDemo = ({ app_link, source_code_link }) => Boolean(app_link) && app_link !== "#" && app_link !== source_code_link;
const hasSource = ({ source_code_link }) => Boolean(source_code_link) && source_code_link !== "#";

// Textes de la page projet
const copy = {
  fr: {
    notFound: "Projet non trouvé",
    back: "Retour aux projets",
    backShort: "Retour",
    nav: "Navigation entre projets",
    prev: "Projet précédent",
    next: "Projet suivant",
    logo: (name) => `Logo ${name}`,
    demo: "Voir la démo",
    code: "Code source",
    share: "Partager",
    copied: "Lien copié !",
    privateTitle: "Code privé, démo sur demande",
    privateText: "Le dépôt n'est pas public. Contactez-moi pour une présentation du projet.",
    contact: "Me contacter",
    video: (name) => `Vidéo de présentation de ${name}`,
    screenshot: (name) => `Capture d'écran de ${name}`,
    results: "Résultats",
    context: "Contexte",
    project: "Le projet",
    objectives: "Objectifs",
    features: "Fonctionnalités clés",
    role: "Mon rôle",
    stack: "Stack technique",
    ctaTitle: "Un projet similaire en tête ?",
    ctaText: "Parlons-en, je suis disponible immédiatement.",
    prevShort: "Précédent",
    nextShort: "Suivant",
    demoLabel: "Démo",
  },
  en: {
    notFound: "Project not found",
    back: "Back to projects",
    backShort: "Back",
    nav: "Project navigation",
    prev: "Previous project",
    next: "Next project",
    logo: (name) => `${name} logo`,
    demo: "View demo",
    code: "Source code",
    share: "Share",
    copied: "Link copied!",
    privateTitle: "Private code, demo on request",
    privateText: "The repository is not public. Contact me for a walkthrough of the project.",
    contact: "Contact me",
    video: (name) => `${name} presentation video`,
    screenshot: (name) => `${name} screenshot`,
    results: "Results",
    context: "Context",
    project: "The project",
    objectives: "Goals",
    features: "Key features",
    role: "My role",
    stack: "Tech stack",
    ctaTitle: "Got a similar project in mind?",
    ctaText: "Let's talk, I'm available right away.",
    prevShort: "Previous",
    nextShort: "Next",
    demoLabel: "Demo",
  },
};

const chipClass = "px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#dfd9ff]";
const navButtonClass =
  "inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.14] text-white hover:bg-white/10 transition-colors";
const cardClass = "bg-tertiary border border-white/[0.08] rounded-[20px]";
const h2Class = "mb-3.5 text-white text-[22px] sm:text-[24px] font-bold";
const bodyClass = "text-[16px] leading-[1.75] text-[#dfd9ff] font-light";
const listClass = "pl-5 list-disc flex flex-col gap-2.5 text-[15px] leading-[1.6] text-[#dfd9ff] marker:text-accent-light";
const eyebrowClass = "text-[13px] uppercase tracking-[0.14em] font-medium text-secondary";

const LockIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

// Apparition douce des blocs, rejouée à chaque changement de projet
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/** Carte « projet précédent / suivant » avec vignette et nom */
const ProjectNavCard = ({ project, label, align = "left" }) => {
  const { href } = useI18n();
  return (
  <Link
    href={href(`/project/${project.id}/`)}
    className={`group flex items-center gap-4 p-[18px] rounded-[20px] bg-tertiary border border-white/[0.08] hover:border-white/25 transition-colors ${
      align === "right" ? "flex-row-reverse text-right" : ""
    }`}
  >
    <img src={project.image} alt="" loading="lazy" className="w-[110px] h-16 rounded-[10px] object-cover shrink-0" />
    <span className="min-w-0">
      <span className="block text-[13px] text-secondary">{label}</span>
      <span className="mt-1 block text-white font-bold text-[17px] truncate group-hover:text-accent-light transition-colors">{project.name}</span>
    </span>
  </Link>
  );
};
ProjectNavCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  align: PropTypes.oneOf(["left", "right"]),
};

const WorkDetail = ({ id }) => {
  const { href, locale, pick } = useI18n();
  const text = copy[locale];
  const projects = useProjects();
  // Même ordre que sur l'accueil : projets mis en avant d'abord, puis les autres
  const orderedProjects = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
  const { push: navigate } = useRouter();

  const prefersReduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const currentIndex = orderedProjects.findIndex((p) => p.id === id);
  const project = orderedProjects[currentIndex];
  const total = orderedProjects.length;
  const prevProject = orderedProjects[(currentIndex - 1 + total) % total];
  const nextProject = orderedProjects[(currentIndex + 1) % total];

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: project.name, url: window.location.href });
        return;
      }
    } catch (e) {
      // ignore et bascule sur le presse-papier
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // rien à faire si le presse-papier n'est pas disponible
    }
  };

  if (!project) {
    return (
      <div className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 text-white/90">
        <p className="text-lg">{text.notFound}</p>
        <Link
          href={href("/#projets")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition"
        >
          {text.back}
        </Link>
      </div>
    );
  }

  const details = project.details || {};
  // Écran mobile flottant à côté de la vidéo : 2e capture de la galerie (la 1re si une seule)
  const floatingScreen = project.gallery?.[1] ?? project.gallery?.[0];

  return (
    <div className="bg-primary min-h-screen relative overflow-x-clip">
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-12 pt-8 pb-24 text-white-100">
        {/* Barre haute : retour, langue, position et projets voisins */}
        <nav className="w-full flex justify-between items-center gap-3" aria-label={text.nav}>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={href("/#projets")}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 sm:px-[18px] rounded-full border border-white/15 bg-white/[0.04] text-white font-semibold text-[14px] hover:bg-white/10 transition-colors"
            >
              <ArrowLeftIcon />
              <span className="sm:hidden">{text.backShort}</span>
              <span className="hidden sm:inline">{text.back}</span>
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="inline-flex items-center gap-2.5">
            <button
              type="button"
              aria-label={`${text.prev} : ${prevProject.name}`}
              title={prevProject.name}
              className={navButtonClass}
              onClick={() => navigate(href(`/project/${prevProject.id}/`))}
            >
              <ChevronIcon className="w-6 h-6" />
            </button>
            <span className="hidden xs:inline font-mono text-[13px] text-secondary tabular-nums">
              {currentIndex + 1} / {total}
            </span>
            <button
              type="button"
              aria-label={`${text.next} : ${nextProject.name}`}
              title={nextProject.name}
              className={navButtonClass}
              onClick={() => navigate(href(`/project/${nextProject.id}/`))}
            >
              <ChevronIcon className="w-6 h-6 rotate-180" />
            </button>
          </div>
        </nav>

        {/* En-tête : logo et nom, accroche, repères, actions */}
        <motion.header key={`header-${id}`} variants={fadeInUp} initial="hidden" animate="show" className="mt-12 flex flex-col gap-[18px]">
          <div className="flex items-center gap-4">
            {project.logo && (
              <img
                src={project.logo}
                alt={text.logo(project.name)}
                className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl object-contain"
              />
            )}
            <h1 className="text-white font-black text-[clamp(40px,5vw,72px)] leading-none">{project.name}</h1>
          </div>
          {project.description && (
            <p className="max-w-[760px] text-[18px] sm:text-[20px] leading-[1.6] font-light">{project.description}</p>
          )}

          <ul className="flex flex-wrap gap-2 text-[13px]">
            {project.reason && <li className={`${chipClass} text-accent-light border-accent/45`}>{project.reason}</li>}
            {project.status && <li className={chipClass}>{project.status}</li>}
            {project.period && <li className={chipClass}>{project.period}</li>}
          </ul>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Dépôt privé : démo sur demande à la place des liens */}
            {project.private_repo && (
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 px-4 py-3 rounded-[14px] border border-cyan/35 bg-cyan/[0.07]">
                <LockIcon />
                <span className="text-[15px] text-white">{text.privateTitle}</span>
                <Link
                  href={href("/#contact")}
                  className="inline-flex items-center min-h-[40px] px-4 rounded-[10px] bg-[#7c4dff] hover:bg-accent text-white font-semibold text-[14px] transition-colors"
                >
                  {text.contact}
                </Link>
              </div>
            )}
            {hasDemo(project) && (
              <a
                href={project.app_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-[14px] bg-[#7c4dff] hover:bg-accent text-white font-semibold transition-colors"
              >
                <DemoIcon />
                {text.demo}
              </a>
            )}
            {hasSource(project) && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-[14px] border border-white/30 hover:bg-white/10 text-white font-semibold transition-colors"
              >
                <GithubIcon />
                {text.code}
              </a>
            )}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border border-white/[0.14] text-white font-semibold text-[14px] hover:bg-white/10 transition-colors"
            >
              <ShareIcon />
              <span aria-live="polite">{copied ? text.copied : text.share}</span>
            </button>
          </div>
        </motion.header>

        {/* Scène : la vidéo inclinée en perspective et un écran mobile qui flotte (CSS 3D, pas de WebGL) */}
        <motion.section
          key={`stage-${id}`}
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          aria-label={text.demoLabel}
          className="project-stage relative mt-12 rounded-[28px] overflow-hidden border border-white/[0.08] bg-[radial-gradient(ellipse_at_40%_40%,#1d1450_0%,#0a0b22_60%,#050816_100%)] p-4 sm:p-8 lg:p-0 lg:h-[620px] lg:flex lg:items-center lg:justify-center"
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.18] [background:radial-gradient(circle,rgba(255,255,255,.5)_1px,transparent_1.5px)_0_0/44px_44px]" />
          <div aria-hidden="true" className="hidden lg:block absolute left-[8%] right-[8%] bottom-[70px] h-40 bg-[radial-gradient(closest-side,rgba(34,211,238,0.25),transparent)] [transform:rotateX(80deg)]" />

          <figure className="stage-screen relative lg:w-[64%] rounded-[18px] overflow-hidden border border-white/15 shadow-[-40px_50px_100px_-30px_rgba(34,211,238,0.35),40px_40px_120px_-30px_rgba(128,77,238,0.7)]">
            {project.showcase ? (
              <video
                src={project.showcase}
                poster={project.image}
                autoPlay={!prefersReduced}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={text.video(project.name)}
                className="block w-full aspect-video bg-black object-cover"
              />
            ) : (
              <img src={project.image} alt={text.screenshot(project.name)} className="block w-full aspect-video object-cover object-top" />
            )}
          </figure>

          {floatingScreen && (
            <div aria-hidden="true" className="stage-phone hidden lg:block absolute right-[9%] top-[110px] w-[170px] rounded-[26px] overflow-hidden border-[6px] border-[#1c1640] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
              <img src={floatingScreen.src} alt="" className="block w-full" />
            </div>
          )}
        </motion.section>

        {/* Galerie de captures (si le projet en a) */}
        {project.gallery?.length > 0 && <Gallery key={`gallery-${id}`} images={project.gallery} projectName={project.name} />}

        {/* Corps : récit à gauche, rôle et stack à droite */}
        <div className="mt-14 flex flex-col lg:flex-row gap-10 items-start">
          <article className="flex-[2] min-w-0 flex flex-col gap-11">
            {details.results?.length > 0 && (
              <section id="resultats" className="rounded-[20px] border border-transparent p-6 [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]">
                <h2 className={h2Class}>{text.results}</h2>
                <ul className={listClass}>
                  {details.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {details.context && (
              <section id="contexte">
                <h2 className={h2Class}>{text.context}</h2>
                <p className={bodyClass}>{details.context}</p>
              </section>
            )}

            {details.fullDescription && (
              <section id="description">
                <h2 className={h2Class}>{text.project}</h2>
                <p className={bodyClass}>{details.fullDescription}</p>
              </section>
            )}

            {details.keyObjectives?.length > 0 && (
              <section id="objectifs">
                <h2 className={h2Class}>{text.objectives}</h2>
                <ul className={listClass}>
                  {details.keyObjectives.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {details.functionalities?.length > 0 && (
              <section id="fonctionnalites">
                <h2 className={h2Class}>{text.features}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.functionalities.map((item) => (
                    <li key={item} className={`${cardClass} px-[18px] py-4 text-[15px] leading-[1.5]`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="flex-1 w-full min-w-0 flex flex-col gap-[18px] lg:sticky lg:top-8">
            {project.role && (
              <div className={`${cardClass} p-6`}>
                <p className={eyebrowClass}>{text.role}</p>
                <p className="mt-2.5 text-[16px] leading-[1.6] text-white">{project.role}</p>
              </div>
            )}
            {project.tags?.length > 0 && (
              <div className={`${cardClass} p-6`}>
                <p className={eyebrowClass}>{text.stack}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <TechBadge key={`tag-${idx}`} {...getTechInfo(tag)} label={pick(getTechInfo(tag).label)} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Projets voisins, puis appel au contact */}
        <footer className="mt-[72px] flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <ProjectNavCard project={prevProject} label={`← ${text.prevShort}`} />
            <ProjectNavCard project={nextProject} label={`${text.nextShort} →`} align="right" />
          </div>

          <div className="rounded-3xl border border-transparent p-7 sm:p-9 flex flex-wrap items-center justify-between gap-5 [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]">
            <div>
              <p className="text-white text-[22px] sm:text-[26px] font-extrabold">{text.ctaTitle}</p>
              <p className="mt-1.5 text-secondary">{text.ctaText}</p>
            </div>
            <Link
              href={href("/#contact")}
              className="inline-flex items-center min-h-[50px] px-[26px] rounded-[14px] bg-[#7c4dff] hover:bg-accent text-white font-semibold transition-colors"
            >
              {text.contact}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

WorkDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WorkDetail;
