/* eslint-disable react-refresh/only-export-components */

import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from "../hoc";

const highlight = "text-accent-light font-semibold";

const ServiceCard = ({ index, title, icon, items }) => {
    return (
        <motion.div
            variants={fadeIn("up", "spring", 0.2 * index, 0.75)}
            className="green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        >
            <div className="bg-tertiary rounded-[20px] h-full p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <img src={icon} alt="" className="w-10 h-10 object-contain" />
                    <h3 className="text-white text-[18px] font-bold">{title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                    {items.map((item) => (
                        <li
                            key={item}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white-100 text-[13px]"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}

ServiceCard.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const About = () => {
  return (
    <>
        <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Mon Profil.</h2>
        </motion.div>

        <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-8 space-y-5"
        >
            <p>
                Développeur web fullstack, j&apos;ai plusieurs années d&apos;expérience en entreprise, en alternance et en freelance.
                J&apos;interviens sur toute la chaîne : du front-end au back-end, jusqu&apos;au déploiement dans le cloud.
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li>Conception et déploiement de plateformes à fort enjeu métier : CRM, e-santé, e-commerce, vidéo-conférence.</li>
                <li>Industrialisation et sécurisation des livraisons : CI/CD, gouvernance des dépendances, politiques CSP sur plusieurs dépôts.</li>
                <li>Des gains mesurables : jusqu&apos;à <span className={highlight}>-80 % de traitement manuel</span> et un <span className={highlight}>build CI divisé par 5</span>.</li>
            </ul>
            <p>
                Je recherche aujourd&apos;hui <span className={highlight}>un poste en CDI de développeur fullstack</span>,
                dans une équipe où m&apos;investir sur le long terme, continuer à apprendre et créer de la valeur.
            </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
    </>
  )
}

export default SectionWrapper(About, "profil");
