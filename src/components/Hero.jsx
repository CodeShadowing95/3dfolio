import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './';

const Hero = () => {
  return (
    <section className="relative w-full mx-auto overflow-hidden lg:h-screen">
        <div className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start gap-5 pt-[100px] lg:pt-[110px] pointer-events-none`}>
            <div className="flex flex-row items-start gap-5 lg:w-[55%] pointer-events-auto">
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="w-5 h-5 rounded-full bg-[#915eff]" />
                    <div className="w-1 sm:h-80 h-40 violet-gradient" />
                </div>

                <div className="">
                    <h1 className={`${styles.heroHeadText} text-white`}><span className="text-[#915eff]">Patrick NAMEGNI</span></h1>
                    <div className={`${styles.heroSubText} text-white-100 max-w-2xl`}>
                        <p>Développeur Web <span className="text-[#915eff]">Fullstack & DevOps</span></p>
                        <p className="font-light text-lg mt-3">Je conçois des applications web performantes et sécurisées, du front-end à l{`'`}infrastructure, et j{`'`}accompagne des équipes à concrétiser leurs projets.</p>
                        <p className="font-light text-lg mt-1">Actuellement disponible pour un poste en CDI/CDD 🚀</p>
                    </div>
                    {/* <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-lg`}>
                        Développeur web - Portfolio<br className="sm:block hidden" />
                        <span className="text-lg">
                            J{`'`}espère que vous profiterez la visite.<br />
                            (N{`'`}oubliez pas de jouer avec mon poste de travail 😉👇)
                        </span>
                    </p> */}
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
        </div>

        <div className="w-full h-[450px] sm:h-[550px] lg:absolute lg:inset-y-0 lg:right-[3%] lg:h-full lg:w-[55%] z-0">
            <ComputersCanvas />
        </div>

        <div className="hidden lg:flex absolute bottom-10 w-full justify-center items-center z-10">
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