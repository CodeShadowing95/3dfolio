import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { github, website, } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect, useState } from "react";

const ProjectCard = ({ index, id, name, description, tags, image, source_code_link, app_link, isAnimated, animationDelay = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: animationDelay,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      key={`project-${index}-${name}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="cursor-pointer"
      onClick={handleClick}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full group"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Overlay au survol */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-white font-semibold text-sm sm:text-base">
              Cliquez pour voir plus
            </span>
          </div>

          <div className="absolute inset-0 z-20 flex justify-end m-3 card-img_hover gap-2">
            {source_code_link !== "#" && (
              <div
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
              >
                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
              </div>
            )}
            <div
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                window.open(app_link, "_blank");
              }}
            >
              <img src={website} alt="website" className="w-1/2 h-1/2 object-contain" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] line-clamp-4">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isAnimated, setIsAnimated] = useState(false);
  const [filterWork, setFilterWork] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

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

      <motion.div
        className="mt-20 flex flex-wrap gap-7 relative"
        variants={fadeIn("", "", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {isFiltering ? (
          <div className="w-full flex flex-col items-center justify-center py-16">
            <div className="relative flex items-center justify-center">
              <span className="sr-only">Chargement des projets…</span>
              <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-violet-400 border-r-purple-400 animate-spin" />
            </div>
            <p className="mt-3 text-white/70 text-sm">Chargement…</p>
          </div>
        ) : (
          filterWork.map((project, index) => (
            <ProjectCard
              key={`project-${activeFilter}-${project.name || index}`}
              isAnimated={isAnimated}
              index={index}
              animationDelay={index * 0.1}
              {...project}
            />
          ))
        )}
      </motion.div>

      <motion.div className="w-full flex mt-20 justify-center items-center md:gap-3 gap-4 md:flex-row flex-col" variants={fadeIn("up", "spring", 0.5, 0.75)}>
        {/* Bouton GitHub + stylé */}
        <div
          className="relative group cursor-pointer overflow-hidden rounded-xl p-[2px] w-[220px]"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)" }}
          onClick={() => window.open("https://github.com/CodeShadowing95", "_blank")}
        >
          <div className="flex items-center justify-center gap-2 rounded-[10px] py-2.5 px-4 bg-white text-slate-900 shadow-md transition-all duration-300 group-hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#0f172a" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
            <span className="text-sm font-semibold">Voir d’autres projets</span>
          </div>
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "0 0 80px rgba(248, 113, 113, 0.15), 0 0 80px rgba(56, 189, 248, 0.15)" }} />
        </div>

        {/* Bouton Télécharger CV + stylé */}
        <div
          className="relative group cursor-pointer overflow-hidden rounded-xl p-[2px] w-[240px]"
        >
          {/* Gradient rotatif en arrière-plan */}
          <div
            className="absolute inset-0 z-0 rounded-xl pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, rgb(6, 182, 212), rgb(217, 70, 239), rgb(6, 182, 212))",
              animation: "spin 6s linear infinite",
              willChange: "transform",
            }}
            aria-hidden="true"
          />
          <div
            className="relative z-10 flex items-center justify-center gap-2 rounded-[10px] py-2.5 px-4 bg-gray-900 text-white w-full transition-all duration-300"
            onClick={() => window.location.href = 'CV Patrick NAMEGNI.pdf'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
            <span className="text-sm font-semibold">Téléchargez mon CV</span>
          </div>
          <div className="absolute inset-0 z-20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 0 80px rgba(248, 113, 113, 0.15), 0 0 80px rgba(56, 189, 248, 0.15)" }} />
        </div>
      </motion.div>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Works, "projets");