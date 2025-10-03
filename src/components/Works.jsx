import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github, website, } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectCategories } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect, useState } from "react";

const ProjectCard = ({ index, name, description, tags, image, source_code_link, app_link, isAnimated, animationDelay = 0 }) => {
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
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
            <div
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => window.open(source_code_link, "_blank")}
            >
              <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
            </div>
            <div
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => window.open(app_link, "_blank")}
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
          capacité à résoudre des problèmes complexes, à travailler avec différentes
          technologies et à gérer efficacement les projets développés.
        </motion.p>
      </div>

      <motion.div variants={textVariant()}>
        <div className="w-full flex flex-wrap justify-center items-center mt-16 mb-8">
          {projectCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleFilterWorks(item.title)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all m-2 min-[2000px]:py-4 min-[2000px]:px-8 min-[2000px]:rounded-xl
                  ${activeFilter === item.title ? "bg-slate-100 text-black hover:bg-white hover:shadow-lg hover:transition-shadow hover:shadow-slate-100" : "bg-slate-900 text-white hover:bg-slate-700"}
                `}
            >
              {item.title}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-20 flex flex-wrap gap-7"
        variants={fadeIn("", "", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
          {!isFiltering && filterWork.map((project, index) => (
            <ProjectCard
              key={`project-${activeFilter}-${project.name || index}`}
              isAnimated={isAnimated}
              index={index}
              animationDelay={index * 0.1}
              {...project}
            />
          ))}
      </motion.div>

      <motion.div className="w-full flex mt-20 justify-center items-center md:gap-2 gap-4 md:flex-row flex-col" variants={fadeIn("up", "spring", 0.5, 0.75)}>
        <div className="flex justify-center items-center py-2 px-4 bg-white rounded-lg cursor-pointer w-[200px] hover:shadow-md gap-2" onClick={() => window.open("https://github.com/CodeShadowing95", "_blank")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000000" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" /></svg>
          <p className="text-base text-slate-900 font-semibold">Et bien d{`'`}autres</p>
        </div>
        <div className="flex justify-center items-center rounded-lg p-[2px] cursor-pointer transition-all max-w-[220px]" style={{ background: "linear-gradient(132deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)" }}>
          <div className="flex justify-center items-center rounded-lg gap-2 py-2 px-4 bg-gray-800 w-full transition-all hover:bg-gradient-to-l from-fuchsia-500 to-cyan-500 hover:bg-transparent" onClick={() => window.location.href = 'CV Patrick NAMEGNI.pdf'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" /></svg>
            <p className="text-sm text-white font-semibold">Téléchargez mon CV</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Works, "projets");