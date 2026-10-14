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
                Développeur full-stack, je viens de terminer mon <span className={highlight}>Mastère Expert développement full stack</span> à Ynov, en alternance.
                Mon parcours a commencé en 2019 au Cameroun, où j&apos;ai conçu plus de dix applications web métier, avant de poursuivre mes études à Lyon puis à Strasbourg.
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li>De la polyvalence : du front-end au déploiement, en Java/Spring Boot, Node.js, React ou Vue.js selon le projet.</li>
                <li>Un réflexe qualité et sécurité acquis en production : CI/CD, mises à jour de dépendances, politiques CSP.</li>
                <li>Des résultats mesurables : un <span className={highlight}>build CI divisé par 5 à 6</span> et <span className={highlight}>-80 % de traitement manuel</span>.</li>
                <li>Un goût pour l&apos;IA générative appliquée : BatiPilote, mon projet de fin d&apos;études, est un copilote IA pour les artisans du bâtiment.</li>
            </ul>
            <p>
                Je recherche <span className={highlight}>un CDI</span> dans une équipe où m&apos;investir sur la durée, avec une vision d&apos;ensemble du produit.
                Basé à Strasbourg, ouvert à toute la France, disponible immédiatement.
            </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
    </>
  )
}

export default SectionWrapper(About, "profil");
