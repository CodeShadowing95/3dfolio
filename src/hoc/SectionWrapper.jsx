"use client";

import { motion } from 'framer-motion';

import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) => 
function HOC() {
    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="px-6 sm:px-12 py-14 sm:py-20 max-w-7xl mx-auto relative z-0"
        >
            <span className="hash-span" id={idName} />
            <Component />
        </motion.section>
    )
}

export default SectionWrapper