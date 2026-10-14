import { Suspense } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full mx-auto overflow-hidden lg:h-screen">
        <div className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start gap-5 pt-[100px] lg:pt-[110px] pointer-events-none`}>
            <div className="flex flex-row items-start gap-5 lg:w-[55%] pointer-events-auto">
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="w-5 h-5 rounded-full bg-accent" />
                    <div className="w-1 sm:h-80 h-40 violet-gradient" />
                </div>

                <div className="">
                    <h1 className={`${styles.heroHeadText} text-white`}><span className="text-accent">Patrick NAMEGNI</span></h1>
                    <div className={`${styles.heroSubText} text-white-100 max-w-2xl`}>
                        <p>Développeur <span className="text-accent">Full-Stack</span></p>
                        <p className="text-secondary font-medium text-[14px] sm:text-[16px] mt-2">Java/Spring Boot · Node.js/TypeScript · React/Next.js · Vue.js/Nuxt</p>
                        <p className="font-light text-[16px] sm:text-lg mt-3">Je conçois des applications web rapides, sécurisées et faciles à maintenir, du code au déploiement.</p>
                        <p className="font-light text-[16px] sm:text-lg mt-1">Disponible immédiatement · CDI</p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="/CV.pdf"
                            download
                            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-[15px] sm:text-[16px] shadow-lg shadow-accent/25 transition-colors duration-300"
                        >
                            Télécharger mon CV
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-xl border border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] sm:text-[16px] transition-colors duration-300"
                        >
                            Me contacter
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full h-[450px] sm:h-[550px] lg:absolute lg:inset-y-0 lg:right-[3%] lg:h-full lg:w-[55%] z-0">
            <Suspense fallback={<div className="w-full h-full" aria-hidden="true" />}>
                <ComputersCanvas />
            </Suspense>
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