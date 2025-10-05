
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { projects, socials } from "../constants";

const WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  return (
    <div className="bg-primary min-h-screen relative">
      <img src={project.image} alt={project.title} className="absolute w-full h-screen object-cover z-0" />
      {/* Overlay dégradé transparent sombre */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary pointer-events-none z-10" />

      {/* Navbar stylée */}
      {/* <nav className="w-full px-4 sm:px-6 lg:px-10 py-3 sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-9 h-9 rounded-lg shadow-sm" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher…"
                className="w-36 sm:w-48 lg:w-64 pl-9 pr-3 py-2 rounded-full bg-tertiary text-white/90 placeholder-white/50 border border-white/10 focus:outline-none focus:border-white/30 transition"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <a href="https://github.com/CodeShadowing95" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-tertiary border border-white/10 hover:border-white/30 hover:bg-tertiary/50 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.14c-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.29-1.72-1.29-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.8 1.26 3.48 1 .1-.77.4-1.27.72-1.56-2.56-.28-5.26-1.28-5.26-5.68 0-1.25.43-2.26 1.14-3.06-.11-.28-.5-1.43.11-2.98 0 0 .95-.31 3.12 1.17.9-.25 1.87-.38 2.83-.38.96 0 1.93.13 2.83.38 2.17-1.47 3.12-1.17 3.12-1.17.62 1.55.22 2.71.11 2.98.71.8 1.14 1.81 1.14 3.06 0 4.41-2.7 5.39-5.26 5.67.41.35.77 1.04.77 2.11v3.13c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-tertiary border border-white/10 hover:border-white/30 hover:bg-tertiary/50 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23.5 6.2a4.6 4.6 0 0 0-3.24-3.25C18.52 2.5 12 2.5 12 2.5s-6.52 0-8.26.45A4.6 4.6 0 0 0 .5 6.2C.05 7.94.05 12 .05 12s0 4.06.45 5.8a4.6 4.6 0 0 0 3.24 3.25c1.74.45 8.26.45 8.26.45s6.52 0 8.26-.45a4.6 4.6 0 0 0 3.24-3.25c.45-1.74.45-5.8.45-5.8s0-4.06-.45-5.8ZM9.75 15.5V8.5l6.5 3.5-6.5 3.5Z" /></svg>
              </a>
              <a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-tertiary border border-white/10 hover:border-white/30 hover:bg-tertiary/50 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M14.5 8h5v-1.5h-5V8Zm7 3.25c-.34-1.8-1.72-3.05-3.69-3.05-2.22 0-3.93 1.61-3.93 4.02 0 2.36 1.67 4.02 4.06 4.02 1.96 0 3.35-1.09 3.74-2.79h-2.06c-.21.73-.83 1.2-1.68 1.2-1.1 0-1.84-.73-1.91-1.8h5.47c.02-.2.02-.42 0-.6ZM18.31 10c.96 0 1.64.55 1.79 1.43h-3.62c.16-.88.86-1.43 1.83-1.43Zm-9.03-2.3c-.55-.5-1.33-.7-2.39-.7H1.5V18h5.39c1.02 0 1.91-.3 2.55-.86.64-.57.98-1.34.98-2.28 0-1.05-.52-1.86-1.39-2.32.68-.43 1.07-1.16 1.07-2.06 0-.83-.27-1.53-.82-2ZM3.27 9.25H6.7c.49 0 .86.1 1.1.32.23.22.35.55.35.97 0 .45-.14.78-.41 1.01-.27.23-.66.35-1.16.35H3.27v-2.65ZM6.94 16.5H3.27v-3.2H6.9c.56 0 .99.12 1.27.37.28.25.43.63.43 1.15 0 .56-.16.96-.46 1.2-.31.26-.77.38-1.2.38Z" /></svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-tertiary border border-white/10 hover:border-white/30 hover:bg-tertiary/50 text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.95V14.9H7.9V12h2.6V9.9c0-2.57 1.52-3.99 3.84-3.99 1.11 0 2.27.2 2.27.2v2.5h-1.28c-1.26 0-1.65.78-1.65 1.58V12h2.81l-.45 2.9h-2.36v7.05A10 10 0 0 0 22 12Z" /></svg>
              </a>
            </div>

            <a
              href="/CV Patrick NAMEGNI.pdf"
              download
              className="px-3 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-md hover:shadow-lg border border-white/20"
            >
              Télécharger mon CV
            </a>
          </div>
        </div>
      </nav> */}

      {/* Contenu de la page */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 text-white/90">
        {/* Bouton retour */}
        <div className="w-full flex justify-between items-center gap-4 mb-8">
          <button
            type="button"
            title="Retour aux projets"
            aria-label="Retour"
            className="group inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-white shadow-lg shadow-black/30 hover:bg-white/10 hover:border-white/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            onClick={() => navigate("/#projets")}
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
          </button>

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

            {/* Environnement technique */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 text-white border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#915eff]" viewBox="0 0 24 24"><path fill="currentColor" d="M17 4v16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-4-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 18H4V4h9zm8-14v12c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5" /></svg>
              <span className="text-sm font-medium">Environnement technique</span>
            </div>

            {/* Tech badges */}
            <div className="flex justify-center md:justify-start flex-wrap gap-2 mt-2 text-xs">
              {['React', 'Next.js', 'Tailwind CSS'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-black/40 text-white border border-white/10">
                  {t}
                </span>
              ))}
            </div>

            {/* Infos */}
            <div className="flex flex-col space-y-2 border border-white/10 rounded-xl p-4 bg-white/5">
              <p className="text-white/90 text-sm">Raison: Test technique</p>
              <p className="text-white/90 text-sm">Statut: {project.status}</p>
              <p className="text-white/90 text-sm">Format: Application web, APIs, Minimum Viable Product (MVP)</p>
            </div>
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
            <div className="space-y-3">
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
              <motion.div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3" variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
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
              <motion.div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3" variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}>
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
            <div className="rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 p-4 flex sm:flex-row flex-col items-center sm:justify-between justify-center gap-4">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;