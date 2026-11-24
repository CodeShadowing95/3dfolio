"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { github, website } from "../assets";
import { SectionWrapper } from "../hoc";
import { getTechInfo } from "../constants/tech";
import { textVariant } from "../utils/motion";
import { track } from "../utils/analytics";
import { useI18n } from "../i18n/I18nProvider";
import { useProjects } from "../i18n/projects";
import ProjectPreview from "./ProjectPreview";

const copy = {
  fr: {
    eyebrow: "Mon travail",
    title: "Projets.",
    filtersLabel: "Filtrer les projets",
    filters: { all: "Tous", fullstack: "Fullstack", ai: "IA", react: "React", next: "Next.js", angular: "Angular" },
    open: "Voir le projet",
    code: (name) => `Code source de ${name} sur GitHub`,
    demo: (name) => `Voir ${name} en ligne`,
    showOthers: (count) => `Voir les ${count} autres projets`,
    hideOthers: "Masquer les autres projets",
    github: "Tout mon code sur GitHub",
    empty: "Aucun projet pour ce filtre.",
  },
  en: {
    eyebrow: "My work",
    title: "Projects.",
    filtersLabel: "Filter projects",
    filters: { all: "All", fullstack: "Full-stack", ai: "AI", react: "React", next: "Next.js", angular: "Angular" },
    open: "View project",
    code: (name) => `${name} source code on GitHub`,
    demo: (name) => `View ${name} live`,
    showOthers: (count) => `See the ${count} other projects`,
    hideOthers: "Hide the other projects",
    github: "All my code on GitHub",
    empty: "No project for this filter.",
  },
};

const hasTag = (project, ...names) => project.tags.some((tag) => names.includes(tag.name));

const FILTERS = {
  all: () => true,
  fullstack: (p) => hasTag(p, "nodejs", "restapi", "mongodb", "springboot", "laravel", "postgresql"),
  ai: (p) => hasTag(p, "ai"),
  react: (p) => hasTag(p, "react", "react native"),
  next: (p) => hasTag(p, "next", "nextjs"),
  angular: (p) => hasTag(p, "angular"),
};

const chip = "inline-flex items-center px-[11px] py-[5px] rounded-full bg-white/5 border border-white/10 text-[#dfd9ff] text-[13px]";
const reasonChip = `${chip} text-accent-light! border-accent/45!`;

const hasDemo = ({ app_link, source_code_link }) => Boolean(app_link) && app_link !== "#" && app_link !== source_code_link;
const hasSource = ({ source_code_link }) => Boolean(source_code_link) && source_code_link !== "#";

// Liens externes posés au-dessus du lien qui couvre toute la carte
const ExternalLinks = ({ project, text, className = "absolute top-3 right-3" }) => (
  <div className={`${className} z-20 flex gap-2`}>
    {hasSource(project) && (
      <a
        href={project.source_code_link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("projet-lien", { projet: project.name, type: "code" })}
        aria-label={text.code(project.name)}
        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
      >
        <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
      </a>
    )}
    {hasDemo(project) && (
      <a
        href={project.app_link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("projet-lien", { projet: project.name, type: "demo" })}
        aria-label={text.demo(project.name)}
        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
      >
        <img src={website} alt="" className="w-1/2 h-1/2 object-contain" />
      </a>
    )}
  </div>
);

ExternalLinks.propTypes = {
  project: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  className: PropTypes.string,
};

const TechChips = ({ tags, max }) => {
  const { pick } = useI18n();
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.slice(0, max).map((tag) => (
        <li key={tag.name} className={chip}>
          {pick(getTechInfo(tag).label)}
        </li>
      ))}
    </ul>
  );
};

TechChips.propTypes = {
  tags: PropTypes.array.isRequired,
  max: PropTypes.number,
};

// Le titre est un vrai lien, étendu à toute la carte par son pseudo-élément
const StretchedLink = ({ project, children, className, place }) => {
  const { href } = useI18n();
  return (
    <Link
      href={href(`/project/${project.id}/`)}
      onClick={() => track("projet-ouvert", { projet: project.id, carte: place })}
      className={`${className} after:absolute after:inset-0 after:z-10 after:rounded-[inherit] focus-visible:outline-none`}
    >
      {children}
    </Link>
  );
};

StretchedLink.propTypes = {
  project: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  place: PropTypes.string.isRequired,
};

// Projet phare : grande carte à bordure dégradée, aperçu incliné en perspective
const Spotlight = ({ project, text }) => {
  const [hovered, setHovered] = useState(false);
  const objectives = project.details?.keyObjectives?.slice(0, 2) ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative mt-10 rounded-[24px] border border-transparent p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-cyan"
    >
      <div className="lg:flex-[1.25_1_0%] min-w-0 [perspective:1400px]">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.12] shadow-[-30px_40px_80px_-30px_rgba(34,211,238,0.35),30px_30px_90px_-30px_rgba(128,77,238,0.6)] transition-transform duration-500 ease-out lg:[transform:rotateY(-10deg)_rotateX(4deg)] lg:group-hover:[transform:rotateY(-3deg)_rotateX(1deg)] motion-reduce:transform-none!">
          <ProjectPreview name={project.name} image={project.image} video={project.video} hovered={hovered} />
        </div>
      </div>

      <div className="lg:flex-[1_1_0%] min-w-0 flex flex-col gap-4">
        <div className="flex items-center gap-3.5">
          {project.logo && (
            <img src={project.logo} alt="" className="w-[52px] h-[52px] rounded-[14px] bg-white/5 border border-white/10 p-1 object-contain" />
          )}
          <div className="flex flex-wrap gap-2">
            {project.reason && <span className={reasonChip}>{project.reason}</span>}
            {project.period && <span className={chip}>{project.period}</span>}
          </div>
        </div>
        <h3 className="text-white font-black text-[30px] sm:text-[36px] leading-tight">
          <StretchedLink project={project} place="phare" className="rounded-[24px]">
            {project.name}
          </StretchedLink>
        </h3>
        <p className="text-[#dfd9ff] text-[15px] sm:text-[16px] leading-[1.65]">{project.description}</p>
        {objectives.length > 0 && (
          <ul className="flex flex-col gap-2 text-secondary text-[15px]">
            {objectives.map((objective) => (
              <li key={objective} className="flex gap-2">
                <span className="text-cyan" aria-hidden="true">→</span>
                {objective}
              </li>
            ))}
          </ul>
        )}
        <TechChips tags={project.tags} max={5} />
        <div className="mt-1 flex items-center justify-between gap-4">
          <span className="font-semibold text-cyan group-hover:underline" aria-hidden="true">
            {text.open} →
          </span>
          {/* Hors de l'aperçu incliné : sa perspective le placerait sous le lien de la carte */}
          <ExternalLinks project={project} text={text} className="relative" />
        </div>
      </div>
    </motion.article>
  );
};

Spotlight.propTypes = {
  project: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
};

// Carte projet : aperçu (vidéo au survol), badges, résumé, technos
const ProjectCard = ({ project, text, index, place }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-[20px] bg-tertiary border border-white/[0.08] hover:border-accent/50 transition-colors has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-cyan"
    >
      <div className="relative aspect-video">
        <ProjectPreview name={project.name} image={project.image} video={project.video} hovered={hovered} />
        <ExternalLinks project={project} text={text} />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-2">
          {project.reason && <span className={reasonChip}>{project.reason}</span>}
          {project.status && <span className={chip}>{project.status}</span>}
        </div>
        <h3 className="text-white font-bold text-[22px]">
          <StretchedLink project={project} place={place} className="rounded-[20px]">
            {project.name}
          </StretchedLink>
        </h3>
        <p className="text-secondary text-[15px] leading-[1.6] line-clamp-3">{project.description}</p>
        <div className="mt-auto pt-1">
          <TechChips tags={project.tags} max={4} />
        </div>
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
};

// Filtre et liste dépliée gardés en mémoire pour les retrouver en revenant d'une page projet
const savedView = { filter: "all", showOthers: false };

const Works = () => {
  const { locale } = useI18n();
  const text = copy[locale];
  const projects = useProjects();
  const [filter, setFilter] = useState(savedView.filter);
  const [showOthers, setShowOthers] = useState(savedView.showOthers);

  useEffect(() => {
    savedView.filter = filter;
    savedView.showOthers = showOthers;
  }, [filter, showOthers]);

  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);
  const others = useMemo(() => projects.filter((p) => !p.featured), [projects]);
  const filtered = useMemo(() => projects.filter(FILTERS[filter]), [projects, filter]);
  const [spotlight, ...highlights] = featured;

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{text.eyebrow}</p>
          <h2 className={styles.sectionHeadText}>{text.title}</h2>
        </motion.div>

        <div role="group" aria-label={text.filtersLabel} className="flex flex-wrap gap-2">
          {Object.keys(FILTERS).map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={`min-h-[40px] px-4 rounded-full text-[14px] font-medium border transition-colors ${
                  active
                    ? "bg-accent-hover border-accent-hover text-white"
                    : "border-white/[0.14] text-[#dfd9ff] hover:border-white/40 hover:text-white"
                }`}
              >
                {text.filters[key]}
              </button>
            );
          })}
        </div>
      </div>

      {filter === "all" ? (
        <>
          {spotlight && <Spotlight project={spotlight} text={text} />}

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((project, index) => (
              <ProjectCard key={project.id} project={project} text={text} index={index} place="vedette" />
            ))}
          </div>

          <AnimatePresence>
            {showOthers && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {others.map((project, index) => (
                  <ProjectCard key={project.id} project={project} text={text} index={index} place="grille" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div layout className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} text={text} index={index} place="filtre" />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && <p className="text-secondary">{text.empty}</p>}
        </motion.div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3">
        {filter === "all" && (
          <button
            type="button"
            onClick={() => setShowOthers((value) => !value)}
            aria-expanded={showOthers}
            className="inline-flex items-center justify-center min-h-[50px] px-[26px] rounded-[14px] border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold transition-colors"
          >
            {showOthers ? text.hideOthers : text.showOthers(others.length)}
          </button>
        )}
        <a
          href="https://github.com/CodeShadowing95"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="github-clic"
          data-umami-event-emplacement="projets"
          className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 rounded-[14px] text-[#dfd9ff] hover:text-white font-medium transition-colors"
        >
          <img src={github} alt="" className="w-5 h-5" />
          {text.github} →
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projets");
