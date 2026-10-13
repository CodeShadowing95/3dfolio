import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projects, socials } from "../constants";
import { reactjs, nextjs, nodejs, angular, typescript, tailwind, css, spring, mongodb, python, openai, docker, git } from "../assets";
import { ArrowLeftIcon, ChevronIcon, ShareIcon, DemoIcon, GithubIcon } from "../components/workdetail/icons";
import { InfoList, TechBadge, SectionCard } from "../components/workdetail/parts";
import Gallery from "../components/workdetail/Gallery";

// Nom affiché et logo local de chaque techno (sans logo : badge texte seul)
const TECH_INFO = {
  react: { label: "React", logo: reactjs },
  "react native": { label: "React Native", logo: reactjs },
  "react-router v7": { label: "React Router 7" },
  nextjs: { label: "Next.js", logo: nextjs },
  nodejs: { label: "Node.js", logo: nodejs },
  angular: { label: "Angular", logo: angular },
  typescript: { label: "TypeScript", logo: typescript },
  tailwindcss: { label: "Tailwind CSS", logo: tailwind },
  css: { label: "CSS", logo: css },
  materialui: { label: "Material UI" },
  springboot: { label: "Spring Boot", logo: spring },
  mongodb: { label: "MongoDB", logo: mongodb },
  laravel: { label: "Laravel" },
  python: { label: "Python", logo: python },
  postgresql: { label: "PostgreSQL" },
  ai: { label: "IA (OpenAI)", logo: openai },
  restapi: { label: "API REST" },
  vite: { label: "Vite" },
  pdfjs: { label: "PDF.js" },
  zustand: { label: "Zustand" },
  docker: { label: "Docker", logo: docker },
  vercel: { label: "Vercel" },
  git: { label: "Git", logo: git },
};

// Un tag peut imposer son propre libellé (ex. "ai" réalisé avec Puter.js et non OpenAI) : badge texte seul
const getTechInfo = ({ name, label }) =>
  label ? { label } : TECH_INFO[String(name || "").toLowerCase().trim()] || { label: name };

// Une démo n'existe que si le lien mène ailleurs que le dépôt de code
const hasDemo = ({ app_link, source_code_link }) => Boolean(app_link) && app_link !== "#" && app_link !== source_code_link;
const hasSource = ({ source_code_link }) => Boolean(source_code_link) && source_code_link !== "#";

// Même ordre que sur l'accueil : projets mis en avant d'abord, puis les autres
const orderedProjects = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

const metaPillClass = "px-3 py-1 rounded-full bg-black/40 border border-white/10 text-white/90";
const navButtonClass =
  "inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all";

// Apparition douce des blocs, rejouée à chaque changement de projet
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/** Carte « projet précédent / suivant » avec vignette et nom */
const ProjectNavCard = ({ project, label, align = "left" }) => (
  <Link
    to={`/project/${project.id}`}
    className={`group flex items-center gap-4 p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 transition ${
      align === "right" ? "flex-row-reverse text-right" : ""
    }`}
  >
    <img src={project.image} alt="" loading="lazy" className="w-24 h-16 rounded-lg object-cover shrink-0" />
    <span className="min-w-0">
      <span className="block text-xs text-white/60">{label}</span>
      <span className="block text-white font-semibold truncate group-hover:text-accent-light transition-colors">{project.name}</span>
    </span>
  </Link>
);
ProjectNavCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  align: PropTypes.oneOf(["left", "right"]),
};

const WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const [copied, setCopied] = useState(false);

  const currentIndex = orderedProjects.findIndex((p) => p.id === id);
  const project = orderedProjects[currentIndex];
  const total = orderedProjects.length;
  const prevProject = orderedProjects[(currentIndex - 1 + total) % total];
  const nextProject = orderedProjects[(currentIndex + 1) % total];

  // Titre d'onglet propre à chaque projet
  useEffect(() => {
    if (!project) return undefined;
    const previousTitle = document.title;
    document.title = `${project.name} | Patrick Namegni`;
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

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
        <p className="text-lg">Projet non trouvé</p>
        <Link
          to="/#projets"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition"
        >
          Retour aux projets
        </Link>
      </div>
    );
  }

  const details = project.details || {};

  return (
    <div className="bg-primary min-h-screen relative">
      {/* Fond : capture du projet floutée derrière l'en-tête */}
      <motion.img
        src={project.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 top-0 w-full h-[80vh] object-cover z-0 blur-sm opacity-40"
        style={{ y: prefersReduced ? 0 : yBg }}
      />
      <div className="absolute inset-x-0 top-0 h-[80vh] bg-gradient-to-b from-primary/70 via-primary/90 to-primary pointer-events-none z-10" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 text-white/90">
        {/* Barre de navigation haute : retour + position + précédent/suivant */}
        <nav className="w-full flex justify-between items-center gap-4 mb-10" aria-label="Navigation entre projets">
          <Link
            to="/#projets"
            className="group inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-white shadow-lg shadow-black/30 hover:bg-white/10 hover:border-white/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent ring-1 ring-white/20 shadow-md transition-transform duration-300 group-hover:-translate-x-0.5">
              <ArrowLeftIcon />
            </span>
            <span className="text-white/90 font-semibold text-sm tracking-wide transition-colors duration-300 group-hover:text-white">
              <span className="sm:hidden">Retour</span>
              <span className="hidden sm:inline">Retour aux projets</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              aria-label={`Projet précédent : ${prevProject.name}`}
              title={prevProject.name}
              className={navButtonClass}
              onClick={() => navigate(`/project/${prevProject.id}`)}
            >
              <ChevronIcon className="w-7 h-7" />
            </button>
            <span className="text-sm text-white/70 tabular-nums min-w-[3.5rem] text-center">
              {currentIndex + 1} / {total}
            </span>
            <button
              type="button"
              aria-label={`Projet suivant : ${nextProject.name}`}
              title={nextProject.name}
              className={navButtonClass}
              onClick={() => navigate(`/project/${nextProject.id}`)}
            >
              <ChevronIcon className="w-7 h-7 rotate-180" />
            </button>
          </div>
        </nav>

        {/* En-tête : titre, accroche, infos clés, actions */}
        <motion.header key={`header-${id}`} variants={fadeInUp} initial="hidden" animate="show" className="max-w-3xl space-y-5">
          <div className="flex items-center gap-4">
            {project.logo && (
              <img
                src={project.logo}
                alt={`Logo ${project.name}`}
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 p-1.5 object-contain"
              />
            )}
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{project.name}</h1>
          </div>
          {project.description && <p className="text-white/80 text-lg leading-relaxed">{project.description}</p>}

          <ul className="flex flex-wrap gap-2 text-xs">
            {project.reason && (
              <li className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-white">{project.reason}</li>
            )}
            {project.status && <li className={metaPillClass}>{project.status}</li>}
            {project.period && <li className={metaPillClass}>{project.period}</li>}
          </ul>

          <div className="flex flex-wrap gap-3 pt-1">
            {hasDemo(project) && (
              <a
                href={project.app_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold shadow-lg shadow-accent/25 transition-colors"
              >
                <DemoIcon />
                Voir la démo
              </a>
            )}
            {hasSource(project) && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-semibold shadow-lg border border-white/20 hover:bg-white/15 transition"
              >
                <GithubIcon />
                Code source
              </a>
            )}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/40 text-white font-medium shadow border border-white/20 hover:bg-black/50 transition"
            >
              <ShareIcon />
              {copied ? "Lien copié !" : "Partager"}
            </button>
          </div>

          {/* Dépôt privé : on propose une démo sur demande à la place des liens */}
          {project.private_repo && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex sm:flex-row flex-col sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm">Code privé, démo sur demande</p>
                <p className="text-white/70 text-sm">Le dépôt n&apos;est pas public. Contactez-moi pour une présentation du projet.</p>
              </div>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center shrink-0 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-lg shadow-accent/25 transition-colors"
              >
                Me contacter
              </Link>
            </div>
          )}
        </motion.header>

        {/* Visuel principal */}
        <motion.figure
          key={`visual-${id}`}
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mt-10 rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-xl"
        >
          <img src={project.image} alt={`Capture d'écran de ${project.name}`} className="w-full h-auto max-h-[70vh] object-cover object-top" />
        </motion.figure>

        {/* Galerie de captures (si le projet en a) */}
        {project.gallery?.length > 0 && <Gallery key={`gallery-${id}`} images={project.gallery} projectName={project.name} />}

        {/* Corps : récit à gauche, infos fixes à droite */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <article className="lg:col-span-2 space-y-8">
            {details.results?.length > 0 && (
              <div id="resultats" className="rounded-xl border border-accent/30 bg-accent/10 p-5 space-y-3">
                <h2 className="text-white text-lg font-semibold">Résultats</h2>
                <InfoList items={details.results} iconClassName="w-4 h-4 text-accent-light mt-0.5 shrink-0" textClassName="text-sm text-white/90" />
              </div>
            )}

            {details.context && (
              <section id="contexte" className="space-y-3">
                <h2 className="text-white text-xl font-semibold">Contexte</h2>
                <p className="text-white/80 leading-relaxed">{details.context}</p>
              </section>
            )}

            {details.fullDescription && (
              <section id="description" className="space-y-3">
                <h2 className="text-white text-xl font-semibold">Le projet</h2>
                <p className="text-white/80 leading-relaxed">{details.fullDescription}</p>
              </section>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {details.keyObjectives?.length > 0 && (
                <SectionCard id="objectifs" title="Objectifs">
                  <InfoList items={details.keyObjectives} iconClassName="w-4 h-4 text-accent-light mt-0.5 shrink-0" />
                </SectionCard>
              )}
              {details.functionalities?.length > 0 && (
                <SectionCard id="fonctionnalites" title="Fonctionnalités clés">
                  <InfoList items={details.functionalities} iconClassName="w-4 h-4 text-accent-light mt-0.5 shrink-0" />
                </SectionCard>
              )}
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {project.role && (
              <SectionCard title="Mon rôle">
                <p className="text-white/80 text-sm leading-relaxed">{project.role}</p>
              </SectionCard>
            )}
            {project.tags?.length > 0 && (
              <SectionCard title="Stack technique">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag, idx) => (
                    <TechBadge key={`tag-${idx}`} {...getTechInfo(tag)} size="sm" />
                  ))}
                </div>
              </SectionCard>
            )}
          </aside>
        </div>

        {/* Pied de page : projets voisins + appel au contact */}
        <footer className="mt-16 pt-10 border-t border-white/10 space-y-10">
          <div className="grid sm:grid-cols-2 gap-4">
            <ProjectNavCard project={prevProject} label="Projet précédent" />
            <ProjectNavCard project={nextProject} label="Projet suivant" align="right" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-accent/10 p-6 flex md:flex-row flex-col md:items-center md:justify-between gap-5">
            <div>
              <p className="text-white text-lg font-semibold">Un projet similaire en tête ?</p>
              <p className="text-white/70 text-sm">Échangeons sur votre besoin.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center whitespace-nowrap px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-lg shadow-accent/25 transition-colors"
              >
                Me contacter
              </Link>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition"
                >
                  <img src={social.logo} alt="" className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WorkDetail;
