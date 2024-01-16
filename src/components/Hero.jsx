import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
        <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
            <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-5 h-5 rounded-full bg-[#915eff]" />
                <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>

            <div className="">
                <h1 className={`${styles.heroHeadText} text-white`}>Hi, I{`'`}m <span className="text-[#915eff]">Patrick</span></h1>
                <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                    Welcome to my 3D web portfolio.<br className="sm:block hidden" />
                    Hope you enjoy taking a look at my projects <span className='text-[12px]'>(Have fun with playing with my desktop right here :D)</span>
                    {/* Below, you will find a selection 
                    of projects that showcase my skills in front-end and back-end development. 
                    Each project represents a unique challenge and an opportunity to 
                    push the boundaries of what{`'`}s possible on the web. */}
                </p>
            </div>
        </div>

        <ComputersCanvas />

        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
            <a href="#about">
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