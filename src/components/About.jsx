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
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
            Je suis un junior en développement d'applications avec de l'expérience en 
            Python, Java, PHP, Typescript, JavaScript et une expertise dans des frameworks tels 
            que Node.js, React, Next.js et frameworks CSS. Je suis actuellement étudiant et suit 
            une formation en Conception d'Applications & Analyse de Données. Durant mes 
            différents stages, j'ai appris beaucoup du domaine et acquis beaucoup de compétences. 
            J'ai notamment collaboré avec des équipes pour créer des solutions efficaces et 
            conviviales qui résolvent des problèmes concrets du monds réel.<br />
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