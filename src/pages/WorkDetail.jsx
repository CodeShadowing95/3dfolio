import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projects, socials } from "../constants";
import { ArrowLeftIcon, ChevronIcon, ShareIcon, DemoIcon, GithubIcon } from "../components/workdetail/icons";
import { InfoList, TechBadge, SectionCard } from "../components/workdetail/parts";

// Mapping des slugs SimpleIcons pour afficher les logos des technologies
const SIMPLE_ICON_SLUGS = {
  react: "react",
  nodejs: "nodedotjs",
  nextjs: "nextdotjs",
  angular: "angular",
  typescript: "typescript",
  tailwindcss: "tailwindcss",
  materialui: "mui",
  springboot: "springboot",
  mongodb: "mongodb",
  css: "css3",
  "react-router v7": "reactrouter",
  laravel: "laravel",
  ai: "openai",
  restapi: "postman",
};

const getSimpleIconSlug = (name) => {
  const key = String(name || "").toLowerCase().trim();
  return SIMPLE_ICON_SLUGS[key] || key.replace(/\s+/g, "");
};

// Variantes d'animation pour les colonnes (déclenchées au scroll, cohérence sur toute la page)
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

const WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0.95]);
  const [copied, setCopied] = useState(false);

  const project = projects.find((p) => p.id === id);
  const currentIndex = projects.findIndex((p) => p.id === id);

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

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    navigate(`/project/${projects[prevIndex].id}`);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    navigate(`/project/${projects[nextIndex].id}`);
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

  return (
    <div className="bg-primary min-h-screen relative">
      <motion.img
        src={project.image}
        alt={project.name}
        className="absolute w-full h-screen object-cover z-0"
        style={{ y: prefersReduced ? 0 : yBg }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary pointer-events-none z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Barre de progression de lecture */}
      <motion.div className="fixed top-0 left-0 h-[3px] w-full z-30 origin-left" style={{ scaleX: scrollYProgress }}>
        <div className="h-full w-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500" />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 text-white/90">
        {/* Barre de navigation haute : retour + précédent/suivant */}
        <div className="w-full flex justify-between items-center gap-4 mb-8">
          <Link
            to="/#projets"
            title="Retour aux projets"
            aria-label="Retour"
            className="group inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-white shadow-lg shadow-black/30 hover:bg-white/10 hover:border-white/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500/70 to-cyan-500/70 ring-1 ring-white/20 shadow-md transition-transform duration-300 group-hover:-translate-x-0.5">
              <ArrowLeftIcon />
            </span>
            <span className="text-white/90 font-semibold text-sm tracking-wide transition-colors duration-300 group-hover:text-white">
              Accueil
            </span>
          </Link>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              aria-label="Précédent"
              className="inline-flex items-center gap-2 px-2 py-2 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all"
              onClick={handlePrev}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/10">
                <ChevronIcon />
              </span>
              <span className="text-sm hidden sm:inline-block">Précédent</span>
            </button>
            <button
              type="button"
              aria-label="Suivant"
              className="inline-flex items-center gap-2 px-2 py-2 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all"
              onClick={handleNext}
            >
              <span className="text-sm hidden sm:inline-block">Suivant</span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/10">
                <ChevronIcon className="w-8 h-8 rotate-180" />
              </span>
            </button>
          </div>
        </div>

        {/* Contenu détaillé du projet en 2 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
          {/* Colonne gauche : média + infos rapides */}
          <motion.div
            key={`left-${id}`}
            className="md:col-span-2 space-y-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              <div className="relative">
                <img src={project.image} alt={project.name} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-3">
              {project.app_link && (
                <a
                  href={project.app_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white text-sm font-semibold shadow border border-white/20 hover:opacity-95 transition"
                >
                  <DemoIcon className="w-4 h-4" />
                  Démo
                </a>
              )}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/40 text-white text-sm font-medium shadow border border-white/20 hover:bg-black/50 transition"
              >
                <ShareIcon />
                {copied ? "Copié !" : "Partager"}
              </button>
            </div>

            {/* Stack technique (unique source d'affichage des tags) */}
            {project.tags?.length > 0 && (
              <SectionCard title="Stack technique" className="bg-white/5">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag, idx) => (
                    <TechBadge key={`tag-${idx}`} name={tag.name} getSlug={getSimpleIconSlug} size="sm" />
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Contexte et défis */}
            <SectionCard id="contexte" title="Contexte et défis">
              <p className="text-white/80 text-sm leading-relaxed">
                {project.description || "Ce projet répond à des besoins identifiés et vise à proposer une solution moderne, performante et maintenable."}
              </p>
            </SectionCard>
          </motion.div>

          {/* Colonne droite : contenu principal */}
          <motion.div
            key={`right-${id}`}
            className="md:col-span-3 space-y-8"
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* En-tête + description */}
            <div className="space-y-3" id="description">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                {project.name}
              </h2>
              <h3 className="text-white font-semibold tracking-tight">Description complète</h3>
              <p className="text-white/80 text-base leading-relaxed">{project.details?.fullDescription}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/90">
                Statut : {project.status}
              </span>
            </div>

            {/* Boutons d'action principaux */}
            <div className="grid sm:grid-cols-2 gap-4">
              {project.app_link && (
                <a
                  href={project.app_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-semibold shadow-lg border border-white/20 hover:opacity-95 transition"
                >
                  <DemoIcon />
                  Voir la démo
                </a>
              )}
              {project.source_code_link && (
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold shadow-lg border border-white/20 hover:bg-white/15 transition"
                >
                  <GithubIcon />
                  Code source
                </a>
              )}
            </div>

            {/* Objectifs & Fonctionnalités */}
            <div className="grid md:grid-cols-2 gap-6">
              {project.details?.keyObjectives?.length > 0 && (
                <SectionCard id="objectifs" title="Objectifs">
                  <InfoList items={project.details.keyObjectives} iconClassName="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />
                </SectionCard>
              )}
              {project.details?.functionalities?.length > 0 && (
                <SectionCard id="fonctionnalites" title="Fonctionnalités clés">
                  <InfoList items={project.details.functionalities} iconClassName="w-4 h-4 text-fuchsia-300 mt-0.5 shrink-0" />
                </SectionCard>
              )}
            </div>

            {/* Bandeau réseaux sociaux */}
            <div id="reseaux" className="rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 p-4 flex sm:flex-row flex-col items-center sm:justify-between justify-center gap-4">
              <div>
                <p className="text-white/90 text-sm font-medium">Envie d&apos;en savoir plus sur moi ?</p>
                <p className="text-white/70 text-xs">Consultez mes réseaux.</p>
              </div>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition"
                  >
                    <img src={social.logo} alt={social.name} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;