import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
        <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
            <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-5 h-5 rounded-full bg-[#915eff]" />
                <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>

            <div className="">
                <h1 className={`${styles.heroHeadText} text-white`}><span className="text-[#915eff]">Patrick NAMEGNI</span></h1>
                <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                    Développeur web.<br className="sm:block hidden" />
                    <span className="text-[18px]">
                        Bienvenue sur mon portfolio. J'espère que vous apprécierez la visite.
                        <br />(N'oubliez pas de jouer avec mon poste de travail 😉👇)
                    </span>
                </p>
                {/* <p className="text-[16px] text-white-100 leading-8 mt-3 max-md:hidden visible">
                    Vous trouverez un certain nombre de projets qui illustrent mes compétences en matière<br />
                    de développement front-end et back-end. Chaque projet représente un défi unique et<br />
                    une opportunité d'en apprendre plus et grandir en compétences. Profitez de la visite<br />
                    et n'oubliez pas de jouer avec mon poste de travail 😉👇.
                </p> */}
                {/* <p className="text-[16px] text-white-100 leading-8 mt-2">
                    Bienvenue sur mon portfolio. J'espère que vous apprécierez la visite<br />
                    et n'oubliez pas de jouer avec mon poste de travail 😉👇.
                </p> */}
            </div>
        </div>

        <ComputersCanvas />

        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
            <a href="#profil">
                <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                    <motion.div
                        animate={{
                            y: [0, 24, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop'
                        }}
                        className="w-3 h-3 rounded-full bg-secondary mb-1"
                    />
                </div>
            </a>
        </div>
    </section>
  )
}

export default Hero