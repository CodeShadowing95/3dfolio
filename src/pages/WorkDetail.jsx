
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projects, socials } from "../constants";

const WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Effets de scroll (parallaxe et progression)
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0.95]);
  const [copied, setCopied] = useState(false);


  // Sélecteur de langue (UI uniquement)
  const [lang, setLang] = useState("FR");

  const project = projects.find((project) => project.id === id);
  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  // Mapping des slugs SimpleIcons pour afficher les logos des technologies
  const simpleIconSlugs = {
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
    return simpleIconSlugs[key] || key.replace(/\s+/g, "");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: project.name, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (e) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Index du projet courant et navigation circulaire
  const currentIndex = projects.findIndex((p) => p.id === id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    navigate(`/project/${projects[prevIndex].id}`);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    navigate(`/project/${projects[nextIndex].id}`);
  };

  // Variantes d'animation pour les colonnes
  const fadeInUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  };

  const scrollToId = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-primary min-h-screen relative">
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute w-full h-screen object-cover z-0"
        style={{ y: prefersReduced ? 0 : yBg }}
      />
      {/* Overlay dégradé transparent sombre */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary pointer-events-none z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Barre de progression de lecture */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] w-full z-30 origin-left"
        style={{ scaleX: scrollYProgress }}
      >
        <div className="h-full w-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500" />
      </motion.div>

      {/* Contenu de la page */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 text-white/90">
        {/* Bouton retour */}
        <div className="w-full flex justify-between items-center gap-4 mb-8">
          <Link
            to="/#projets"
            title="Retour aux projets"
            aria-label="Retour"
            className="group inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-white shadow-lg shadow-black/30 hover:bg-white/10 hover:border-white/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500/70 to-cyan-500/70 ring-1 ring-white/20 shadow-md transition-transform duration-300 group-hover:-translate-x-0.5">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="currentColor" d="m13.15 16.15l-3.625-3.625q-.125-.125-.175-.25T9.3 12t.05-.275t.175-.25L13.15 7.85q.075-.075.163-.112T13.5 7.7q.2 0 .35.138T14 8.2v7.6q0 .225-.15.363t-.35.137q-.05 0-.35-.15"/></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 rotate-180" viewBox="0 0 24 24"><path fill="currentColor" d="m13.15 16.15l-3.625-3.625q-.125-.125-.175-.25T9.3 12t.05-.275t.175-.25L13.15 7.85q.075-.075.163-.112T13.5 7.7q.2 0 .35.138T14 8.2v7.6q0 .225-.15.363t-.35.137q-.05 0-.35-.15"/></svg>
              </span>
            </button>
          </div>
        </div>


        {/* Contenu détaillé du projet en 2 colonnes horizontales */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20">

          {/* Colonne gauche (plus petite) */}
          <motion.div
            key={`left-${id}`}
            className="md:col-span-2 space-y-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Carte media avec image et note */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.id}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Étoiles de notation */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-fuchsia-400" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z" /></svg>
                  ))}
                  <span className="ml-2 text-white/80 text-xs">Note</span>
                </div>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 text-white border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" /></svg>
                <span className="text-sm">#{project.id}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 text-white border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-300" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3" /></svg>
                <span className="text-sm">+100 visites</span>
              </div>
            </div>

            {/* Infos */}
            <div className="flex flex-col space-y-2 border border-white/10 rounded-xl p-4 bg-white/5">
              <p className="text-white/90 text-sm">Raison: {project.reason}</p>
              <p className="text-white/90 text-sm">Statut: {project.status}</p>
              <p className="text-white/90 text-sm">Format: Application web</p>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/CV Patrick NAMEGNI.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-medium shadow border border-white/20 hover:bg-white/15 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z" /></svg>
                Télécharger le CV
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/40 text-white text-sm font-medium shadow border border-white/20 hover:bg-black/50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22"/></svg>
                {copied ? "Copié !" : "Partager"}
              </button>
            </div>

            {/* Fonctionnalités en bref */}
            {project.details?.functionalities?.length > 0 && (
              <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                <h4 className="text-white font-semibold text-sm mb-2">Fonctionnalités en bref</h4>
                <ul className="space-y-1">
                  {project.details.functionalities.slice(0, 3).map((fn, idx) => (
                    <li key={`left-fn-${idx}`} className="flex items-start gap-2 text-xs text-white/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-fuchsia-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stack visuelle */}
            {project.tags?.length > 0 && (
              <div className="border border-white/10 rounded-xl p-3 bg-white/5">
                <h4 className="text-white font-semibold text-sm mb-2">Stack visuelle</h4>
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={`left-tag-${idx}`} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-white/90">
                      <img
                        src={`https://cdn.simpleicons.org/${getSimpleIconSlug(tag.name)}`}
                        alt={`${tag.name} logo`}
                        className="w-3.5 h-3.5 opacity-90"
                        loading="lazy"
                      />
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Colonne droite (plus grande) */}
          <motion.div
            key={`right-${id}`}
            className="md:col-span-3 space-y-8"
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >

            {/* En-tête du projet */}
            <div className="space-y-3" id="description">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  {project.name}
                </h2>
                {/* Sélecteur de langue FR/EN */}
                <div className="flex justify-end">
                  <div className="inline-flex p-1 rounded-full border border-white/10 bg-white/5">
                    <button
                      type="button"
                      aria-label="Langue Français"
                      aria-pressed={lang === 'FR'}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${lang === 'FR' ? 'bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/30 text-white' : 'text-white/80 hover:text-white'}`}
                      onClick={() => setLang('FR')}
                    >
                      FR
                    </button>
                    <button
                      type="button"
                      aria-label="Langue Anglais"
                      aria-pressed={lang === 'EN'}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${lang === 'EN' ? 'bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/30 text-white' : 'text-white/80 hover:text-white'}`}
                      onClick={() => setLang('EN')}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-semibold tracking-tight">Description complète</h3>
              <p className="text-white/80 text-base leading-relaxed">
                {project.details.fullDescription}
              </p>
            </div>

            {/* Métadonnées et tags */}
            <div className="flex flex-wrap items-center gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={`${tag.name}-${idx}`}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/90"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${getSimpleIconSlug(tag.name)}`}
                    alt={`${tag.name} logo`}
                    className="w-4 h-4 opacity-90"
                    loading="lazy"
                  />
                  {tag.name}
                </span>
              ))}
              <span className="ml-1 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/90">
                Statut: {project.status}
              </span>
            </div>

            {/* Boutons d’action */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={project.app_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-semibold shadow-lg border border-white/20 hover:opacity-95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 7l10 5l10-5zm0 7l-10 5l10 5l10-5z" /></svg>
                Voir la démo
              </a>
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold shadow-lg border border-white/20 hover:bg-white/15 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.71c-2.78.61-3.37-1.34-3.37-1.34c-.46-1.16-1.12-1.47-1.12-1.47c-.92-.63.07-.62.07-.62c1 .07 1.52 1.03 1.52 1.03c.9 1.55 2.41 1.1 3 .84c.09-.65.35-1.08.64-1.33c-2.22-.24-4.56-1.11-4.56-4.92c0-1.09.38-1.98 1-2.68c-.1-.25-.44-1.26.1-2.62c0 0 .84-.27 2.75 1.05c.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.32 2.75-1.05 2.75-1.05c.54 1.36.2 2.37.1 2.62c.62.7 1 1.59 1 2.68c0 3.82-2.34 4.67-4.57 4.91c.36.31.69.92.69 1.86v2.75c0 .26.18.59.69.49A10 10 0 0 0 12 2" /></svg>
                Code source
              </a>
            </div>

            {/* Détails */}
            <motion.div className="grid md:grid-cols-2 gap-6" variants={fadeInUp} initial="hidden" animate="show">
              <motion.div id="objectifs" className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3" variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
                <h3 className="text-white font-semibold">Objectifs</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {project.details.keyObjectives.map((objective, idx) => (
                    <li key={`objective-${idx}`} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                      <span>{objective}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Expérience utilisateur fluide et moderne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Architecture scalable et maintenable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Performance et accessibilité soignées</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div id="fonctionnalites" className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3" variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}>
                <h3 className="text-white font-semibold">Fonctionnalités clés</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {project.details.functionalities.map((functionality, idx) => (
                    <li key={`functionality-${idx}`} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-fuchsia-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                      <span>{functionality}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-fuchsia-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Navigation intuitive et retours visuels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-fuchsia-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Design responsive (mobile / desktop)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-fuchsia-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Intégration API et données en temps réel</span>
                  </li>
                </ul>
              </motion.div>
          </motion.div>

            {/* Bandeau d’appel avec réseaux sociaux */}
            <div id="reseaux" className="rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 p-4 flex sm:flex-row flex-col items-center sm:justify-between justify-center gap-4">
              <div>
                <p className="text-white/90 text-sm font-medium">Envie d’en savoir plus sur moi ?</p>
                <p className="text-white/70 text-xs">Consultez mes réseaux.</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Icônes sociales stylées (assets/socials) */}
                {socials.map((social) => (
                  <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition">
                    <img src={social.logo} alt={social.name} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Sections de contenu enrichi */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* Contexte et défis */}
              <div id="contexte" className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                <h3 className="text-white font-semibold">Contexte et défis</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {project.description ? (
                    <> {project.description} </>
                  ) : (
                    <>Ce projet répond à des besoins identifiés et vise à proposer une solution moderne, performante et maintenable. Voir la description complète ci-dessus.</>
                  )}
                </p>
                <ul className="space-y-1 text-xs text-white/70">
                  {project.details?.keyObjectives?.slice(0, 3).map((objective, idx) => (
                    <li key={`cx-${idx}`} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approche et solutions techniques */}
              <div id="approche" className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                <h3 className="text-white font-semibold">Approche et solutions techniques</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Stack principale: {project.tags?.map(t => t.name).join(', ') || 'technologies modernes'}.
                </p>
                <ul className="space-y-1 text-xs text-white/70">
                  {project.details?.functionalities?.slice(0, 3).map((fn, idx) => (
                    <li key={`ap-${idx}`} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-fuchsia-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Résultats et impact */}
              <div id="impact" className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                <h3 className="text-white font-semibold">Résultats et impact</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Statut: {project.status}. Principaux bénéfices: expérience fluide, design responsive, intégration API fiable et performance optimisée.
                </p>
                <ul className="space-y-1 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>UX améliorée et navigation claire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Maintenabilité et scalabilité renforcées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-300 mt-0.5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M10.09 15.59L7.5 13l-1.41 1.41l4 4l8-8L16.68 9z" /></svg>
                    <span>Performances front optimisées (chargement, animations)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Liens utiles */}
            <div id="liens" className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 mt-6">
              <h3 className="text-white font-semibold">Liens utiles</h3>
              <div className="flex flex-wrap items-center gap-3">
                {project.app_link && (
                  <a href={project.app_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white text-xs font-semibold shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 7l10 5l10-5zm0 7l-10 5l10 5l10-5z" /></svg>
                    Démo
                  </a>
                )}
                {project.source_code_link && (
                  <a href={project.source_code_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/20 hover:bg-white/15">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.71c-2.78.61-3.37-1.34-3.37-1.34c-.46-1.16-1.12-1.47-1.12-1.47c-.92-.63.07-.62.07-.62c1 .07 1.52 1.03 1.52 1.03c.9 1.55 2.41 1.1 2.99.84c.09-.66.35-1.1.63-1.35c-2.22-.25-4.56-1.11-4.56-4.95c0-1.1.39-2 1.03-2.71c-.1-.25-.45-1.29.1-2.68c0 0 .83-.27 2.75 1.03c.79-.22 1.64-.33 2.49-.33c.85 0 1.69.11 2.49.33c1.92-1.3 2.75-1.03 2.75-1.03c.55 1.39.2 2.43.1 2.68c.64.71 1.03 1.61 1.03 2.71c0 3.85-2.34 4.7-4.57 4.95c.36.31.68.91.68 1.84v2.72c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
                    Code source
                  </a>
                )}
              </div>
            </div>

            {/* Mini-nav d’ancres */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {[
                { id: "description", label: "Description" },
                { id: "objectifs", label: "Objectifs" },
                { id: "fonctionnalites", label: "Fonctionnalités" },
                { id: "reseaux", label: "Réseaux" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;