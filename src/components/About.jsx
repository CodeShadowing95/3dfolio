import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
    return (
        <Tilt className="xs:w-[250px] w-full">
            <motion.div
                variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
                className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
            >
                {/* eslint-disable-next-line react/no-unknown-property */}
                <div options={{ max: 45, scale: 1, speed: 450 }}
                    className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
                >
                    <img src={icon} alt={title} className="w-16 h-16 object-contain"/>
                    <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
                </div>
            </motion.div>
        </Tilt>
    )
}

const About = () => {
  return (
    <>
        <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Mon Profil.</h2>
        </motion.div>

        <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-4xl leading-8"
        >
            Je suis développeur web fullstack, avec de l’expérience sur plusieurs technologies :
            <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent font-bold"> JavaScript, TypeScript, PHP, Java, ainsi que des frameworks modernes comme React, Next.js, Node.js et des outils d’intégration API REST, solutions vidéo (Twilio), MongoDB, Laravel, Docker et bien d'autres.</span><br /><br/>
            Au fil de stages, alternances et missions freelances, j’ai eu l’occasion de :
            <ul className="list-disc list-inside text-secondary text-[17px] max-w-4xl leading-[30px] space-y-2">
                <li>Concevoir et déployer des plateformes web (CRM, e-santé, e-commerce).</li>
                <li>Intégrer des APIs et services externes pour enrichir des fonctionnalités dans mes projets personnels ou professionnels.</li>
                <li>Améliorer l’ergonomie et la performance d’applications pour offrir une expérience utilisateur fluide.</li>
                <li>Automatiser les tâches répétitives et optimiser les flux de travail.</li>
            </ul><br/>
            Je cherche à intégrer une <span className="bg-gradient-to-r from-green-300 via-lime-200 to-emerald-200 bg-clip-text text-transparent font-bold">alternance d’une durée de 1 an, à partir d’octobre à décembre 2025, avec un rythme 2 semaines entreprise / 1 semaine école</span>,
            dans le cadre de mon Master 2 Expert Développement Web.<br/>
            Mon objectif : <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-200 bg-clip-text text-transparent font-bold">mettre mes compétences à profit dans un environnement structuré et contribuer activement à vos projets.</span><br/><br/>
            Travaillons ensemble afin donner vie à vos idées 🤝.
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(About, "profil");