/* eslint-disable react-refresh/only-export-components */

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { github, website, } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect, useState } from "react";

const tagClass = "px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white-100 text-[12px]";

// Pas d'effet tilt sur les écrans tactiles (il n'y a pas de survol)
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const TiltWrapper = ({ className, children }) =>
  canHover ? (
    <Tilt options={{ max: 8, scale: 1, speed: 450 }} className={className}>
      {children}
    </Tilt>
  ) : (
    <div className={className}>{children}</div>
  );

TiltWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const hasDemo = (app_link, source_code_link) => app_link && app_link !== "#" && app_link !== source_code_link;

const ProjectLinks = ({ name, source_code_link, app_link }) => (
  <div className="absolute inset-0 z-20 flex justify-end items-start m-3 gap-2 pointer-events-none">
    {source_code_link && source_code_link !== "#" && (
      <a
        href={source_code_link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Code source de ${name} sur GitHub`}
        className="pointer-events-auto black-gradient w-10 h-10 rounded-full flex justify-center items-center"
      >
        <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
      </a>
    )}
    {hasDemo(app_link, source_code_link) && (
      <a
        href={app_link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Voir ${name} en ligne`}
        className="pointer-events-auto black-gradient w-10 h-10 rounded-full flex justify-center items-center"
      >
        <img src={website} alt="" className="w-1/2 h-1/2 object-contain" />
      </a>
    )}
  </div>
);

ProjectLinks.propTypes = {
  name: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
  app_link: PropTypes.string.isRequired,
};

const Tags = ({ tags, max }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.slice(0, max).map((tag) => (
      <li key={tag.name} className={tagClass}>{tag.name}</li>
    ))}
  </ul>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired,
  max: PropTypes.number,
};

// Grande carte pour les projets mis en avant
const FeaturedCard = ({ id, name, description, tags, image, source_code_link, app_link, status, details, index }) => {
  const navigate = useNavigate();
  const objectives = details?.keyObjectives?.slice(0, 3) ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: "easeOut" }}
      onClick={() => navigate(`/project/${id}`)}
      className="group cursor-pointer bg-tertiary rounded-2xl p-5 border border-white/10 hover:border-accent/60 transition-colors flex flex-col gap-5"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={`Aperçu de ${name}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <ProjectLinks name={name} source_code_link={source_code_link} app_link={app_link} />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          {status && (
            <span className="shrink-0 px-2.5 py-1 rounded-full text-[12px] font-medium bg-accent/15 text-accent-light border border-accent/30">
              {status}
            </span>
          )}
        </div>
        <p className="text-secondary text-[15px] leading-6">{description}</p>

        {objectives.length > 0 && (
          <ul className="list-disc list-inside text-white-100 text-[14px] leading-6 space-y-1">
            {objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-3">
          <Tags tags={tags} max={4} />
          <span className="text-accent-light text-[14px] font-semibold group-hover:underline">Voir le détail →</span>
        </div>
      </div>
    </motion.article>
  );
};

FeaturedCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
  app_link: PropTypes.string.isRequired,
  status: PropTypes.string,
  details: PropTypes.shape({ keyObjectives: PropTypes.arrayOf(PropTypes.string) }),
};

const ProjectCard = ({ id, name, description, tags, image, source_code_link, app_link, animationDelay = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay, ease: "easeOut" }}
      className="cursor-pointer"
      onClick={() => navigate(`/project/${id}`)}
    >
      <TiltWrapper className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full group border border-transparent hover:border-white/10">
        <div className="relative w-full h-[200px]">
          <img
            src={image}
            alt={`Aperçu de ${name}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top rounded-xl"
          />
          <ProjectLinks name={name} source_code_link={source_code_link} app_link={app_link} />
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[20px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-6 line-clamp-3">{description}</p>
        </div>

        <div className="mt-4">
          <Tags tags={tags} max={4} />
        </div>
      </TiltWrapper>
    </motion.div>
  )
}

ProjectCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
  app_link: PropTypes.string.isRequired,
  animationDelay: PropTypes.number,
};

const featuredProjects = projects.filter((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);

const Works = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [filterWork, setFilterWork] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  useEffect(() => {
    setFilterWork(projects);
  }, [])


  const handleFilterWorks = (title) => {
    if (activeFilter === title) return; // Éviter de refiltrer si c'est déjà le filtre actif

    setActiveFilter(title);
    setIsFiltering(true);

    // Petit délai pour permettre l'animation de sortie
    setTimeout(() => {
      switch (title) {
        case "Tous":
          setFilterWork(projects);
          break;

        case "UI/UX":
          setFilterWork(projects.filter((work) => work.tags.some(tag => tag.name === "tailwindcss") || work.tags.some(tag => tag.name === "materialui")))
          break;

        case "Fullstack App":
          setFilterWork(projects.filter((work) => work.tags.some(tag => tag.name === "nodejs") || work.tags.some(tag => tag.name === "restapi") || work.tags.some(tag => tag.name === "mongodb") || work.tags.some(tag => tag.name === "springboot") || work.tags.some(tag => tag.name === "laravel")))
          break;

        case "React":
          setFilterWork(projects.filter((work) => work.tags.some(tag => tag.name === "react")))
          break;

        case "Next.js":
          setFilterWork(projects.filter((work) => work.tags.some(tag => tag.name === "next" || tag.name === "nextjs")))
          break;

        case "Angular":
          setFilterWork(projects.filter((work) => work.tags.some(tag => tag.name === "angular")))
          break;

        case "AI":
          setFilterWork(projects.filter((work) => work.tags.some(tag => tag.name === "ai")))
          break;

        default:
          setFilterWork(projects);
          break;
      }
      setIsFiltering(false);
    }, 200);
  }

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Travaux réalisés jusque là</p>
        <h2 className={styles.sectionHeadText}>Projets.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Les projets suivants présentent mes compétences et mon expérience à travers des
          exemples concrets de mon travail. Chaque projet est brièvement décrit avec des
          liens vers des dépôts de code et des démonstrations en direct. Il reflète ma
          <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-fuchsia-200 bg-clip-text text-transparent font-bold"> capacité à résoudre des problèmes complexes, à travailler avec différentes
          technologies et à gérer efficacement les projets développés.</span>
        </motion.p>
      </div>

      <motion.div variants={textVariant()}>
        <div className="w-full flex justify-center mt-16 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-2 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm">
            {projectCategories.map((item) => {
              const isActive = activeFilter === item.title;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleFilterWorks(item.title)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={isActive}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all m-1 min-[2000px]:py-4 min-[2000px]:px-8 min-[2000px]:rounded-xl
                    ${isActive
                      ? "text-white bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/30 shadow-lg"
                      : "text-white/80 bg-black/40 hover:bg-black/50 border border-white/10 hover:border-white/20 hover:text-white shadow-sm"}
                  `}
                >
                  {item.title}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {isFiltering ? (
        <div className="mt-20 w-full flex flex-col items-center justify-center py-16">
          <div className="relative flex items-center justify-center">
            <span className="sr-only">Chargement des projets…</span>
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-violet-400 border-r-purple-400 animate-spin" />
          </div>
          <p className="mt-3 text-white/70 text-sm">Chargement…</p>
        </div>
      ) : activeFilter === "Tous" ? (
        <>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-7">
            {featuredProjects.map((project, index) => (
              <FeaturedCard key={project.id} index={index} {...project} />
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowOthers((value) => !value)}
              aria-expanded={showOthers}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 text-white text-[15px] font-medium transition-colors"
            >
              {showOthers ? "Masquer les autres projets" : `Voir les ${otherProjects.length} autres projets`}
            </button>
          </div>

          {showOthers && (
            <div className="mt-10 flex flex-wrap justify-center gap-7">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} animationDelay={index * 0.05} {...project} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mt-16 flex flex-wrap justify-center gap-7">
          {filterWork.map((project, index) => (
            <ProjectCard
              key={`project-${activeFilter}-${project.id}`}
              animationDelay={index * 0.05}
              {...project}
            />
          ))}
        </div>
      )}

      <motion.div className="w-full flex mt-20 justify-center items-center md:gap-3 gap-4 md:flex-row flex-col" variants={fadeIn("up", "spring", 0.5, 0.75)}>
        <a
          href="https://github.com/CodeShadowing95"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-[240px] rounded-xl py-3 px-4 bg-white text-slate-900 font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0f172a" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
          Voir d’autres projets
        </a>

        <a
          href="/CV.pdf"
          download
          className="flex items-center justify-center gap-2 w-[240px] rounded-xl py-3 px-4 bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-lg shadow-accent/25 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
          Télécharger mon CV
        </a>
      </motion.div>
    </>
  )
}

export default SectionWrapper(Works, "projets");