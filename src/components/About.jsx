/* eslint-disable react-refresh/only-export-components */

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

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

ServiceCard.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

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
            Je suis développeur web fullstack, fort de plusieurs années d’expérience en entreprise, en alternance et en freelance, sur des technologies telles que :
            <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent font-bold"> JavaScript, TypeScript, PHP, Java, ainsi que des frameworks modernes comme React, Next.js, Vue/Nuxt, Node.js et des outils d’intégration API REST, solutions vidéo (Twilio), MongoDB, Laravel, Docker et bien d&apos;autres.</span><br /><br/>
            Mon profil s&apos;étend également au <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent font-bold">DevOps et au cloud (AWS, CI/CD GitHub Actions, sécurité applicative CSP)</span>, ce qui me permet d&apos;intervenir sur l&apos;ensemble de la chaîne, du code jusqu&apos;au déploiement.<br/><br/>
            Au fil de mes missions, j’ai eu l’occasion de :
            <ul className="list-disc list-inside text-secondary text-[17px] max-w-4xl leading-[30px] space-y-2">
                <li>Concevoir et déployer des plateformes web à fort enjeu métier (CRM, e-santé, e-commerce, vidéo-conférence).</li>
                <li>Intégrer des APIs et services externes pour enrichir des fonctionnalités dans des projets personnels et professionnels.</li>
                <li>Améliorer l’ergonomie et la performance d’applications pour offrir une expérience utilisateur fluide.</li>
                <li>Sécuriser et industrialiser des chaînes de livraison (CI/CD, gouvernance des dépendances, politiques de sécurité CSP) à l&apos;échelle de plusieurs dépôts.</li>
                <li>Automatiser des tâches répétitives et optimiser des flux de travail, avec des gains mesurables (jusqu&apos;à -80% de temps de traitement manuel, build CI divisé par 5).</li>
            </ul><br/>
            Aujourd&apos;hui, je recherche <span className="bg-gradient-to-r from-green-300 via-lime-200 to-emerald-200 bg-clip-text text-transparent font-bold">un poste en CDI de développeur fullstack</span>, où je pourrai mettre à profit mon expérience terrain et mon autonomie pour contribuer durablement à des projets ambitieux.<br/><br/>
            Mon objectif : <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-200 bg-clip-text text-transparent font-bold">m&apos;investir sur le long terme dans une équipe où je pourrai continuer à apprendre, monter en compétences et créer de la valeur.</span><br/><br/>
            Travaillons ensemble afin de donner vie à vos idées 🤝.
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
    </>
  )
}

export default SectionWrapper(About, "profil");