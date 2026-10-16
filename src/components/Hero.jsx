import { Suspense, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { BOOKING_URL } from '../constants';
import { track } from '../utils/analytics';
import { getVisitorCompany } from '../utils/visitor';
import { ComputersCanvas } from './canvas';
import RecruiterPanel from './RecruiterPanel';

const Hero = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [company] = useState(getVisitorCompany);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const openPanel = () => {
    setPanelOpen(true);
    track('panneau-recruteur-ouvert');
  };

  return (
    <section className="relative w-full mx-auto overflow-hidden lg:h-screen">
        <div className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start gap-5 pt-[100px] lg:pt-[110px] pointer-events-none`}>
            <div className="flex flex-row items-start gap-5 lg:w-[55%] pointer-events-auto">
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="w-5 h-5 rounded-full bg-accent" />
                    <div className="w-1 sm:h-80 h-40 violet-gradient" />
                </div>

                <div className="">
                    {company && (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mb-3 w-fit px-3 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 text-white text-[14px] sm:text-[15px]"
                        >
                            Bonjour l{`'`}équipe <span className="font-semibold text-cyan">{company}</span> 👋 Merci de votre visite.
                        </motion.p>
                    )}
                    <h1 className={`${styles.heroHeadText} text-white`}><span className="text-accent">Patrick NAMEGNI</span></h1>
                    <div className={`${styles.heroSubText} text-white-100 max-w-2xl`}>
                        <p>Développeur <span className="text-accent">Full-Stack</span></p>
                        {/* <p className="text-secondary font-medium text-[14px] sm:text-[16px] mt-2">Java/Spring Boot · Node.js/TypeScript · React/Next.js · Vue.js/Nuxt</p> */}
                        <p className="font-light text-[16px] sm:text-lg mt-3">Je conçois des applications web rapides, sécurisées et faciles à maintenir, du code au déploiement.</p>
                        {/* <p className="font-light text-[16px] sm:text-lg mt-1">Disponible immédiatement · CDI</p> */}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="/CV.pdf"
                            download
                            onClick={() => track('cv-telecharge', { emplacement: 'hero' })}
                            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-[15px] sm:text-[16px] shadow-lg shadow-accent/25 transition-colors duration-300"
                        >
                            Télécharger mon CV
                        </a>
                        <a
                            href="#contact"
                            onClick={() => track('contact-clic', { emplacement: 'hero' })}
                            className="px-6 py-3 rounded-xl border border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] sm:text-[16px] transition-colors duration-300"
                        >
                            Me contacter
                        </a>
                        {BOOKING_URL && (
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-umami-event="rdv-clic"
                                data-umami-event-emplacement="hero"
                                className="px-6 py-3 rounded-xl border border-cyan/50 hover:bg-cyan/10 text-white font-semibold text-[15px] sm:text-[16px] transition-colors duration-300"
                            >
                                Réserver un appel de 15 min
                            </a>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={openPanel}
                        className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-white-100 hover:text-white group"
                    >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan/15 text-cyan" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66c.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21"/>
                            </svg>
                        </span>
                        <span>
                            Recruteur ? <span className="underline decoration-cyan/60 underline-offset-4 group-hover:decoration-cyan">Mon profil en 30 secondes</span>
                        </span>
                    </button>
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

        <RecruiterPanel open={panelOpen} onClose={closePanel} />
    </section>
  )
}

export default Hero