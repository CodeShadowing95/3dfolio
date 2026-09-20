/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ testimonial, name, designation, company, linkedin }) => {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="bg-black-200 p-8 sm:p-10 rounded-3xl w-full min-h-[300px] sm:min-h-[280px]">
            <p className="text-white font-black text-[48px]">&quot;</p>

            <div className="mt-1">
                <p className="text-white tracking-wider text-[17px] sm:text-[18px] leading-relaxed">{testimonial}</p>
                <div className="mt-7 flex justify-between items-center gap-1">
                    <div className="flex-1 flex flex-col">
                        <p className="text-white font-medium text-[16px]">
                            <span className="blue-text-gradient">@</span>{" "}
                            {linkedin ? (
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-[#915eff] transition-colors duration-200 underline underline-offset-4"
                                >
                                    {name}
                                </a>
                            ) : (
                                name
                            )}
                        </p>
                        <p className="mt-1 text-secondary text-[12px]">
                            {designation} of {company}
                        </p>
                    </div>

                    <div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#915eff] to-[#4d3dff] flex items-center justify-center text-white text-[13px] font-bold"
                        aria-hidden="true"
                    >
                        {initials}
                    </div>
                </div>
            </div>
        </div>
    );
}

FeedbackCard.propTypes = {
    testimonial: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    linkedin: PropTypes.string,
}

const Feedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
        <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Ce que d&apos;autres disent</p>
                <h2 className={styles.sectionHeadText}>Feedback.</h2>
            </motion.div>
        </div>
        <div className={`${styles.paddingX} -mt-20 pb-14`}>
            <div className="mx-auto w-full max-w-[820px]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={`${currentTestimonial.name}-${currentIndex}`}
                        custom={direction}
                        variants={fadeIn("", "spring", 0, 0.5)}
                        initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <FeedbackCard {...currentTestimonial} />
                    </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        onClick={handlePrev}
                        aria-label="Précédent"
                        className="w-10 h-10 rounded-full bg-black-200 text-white hover:bg-[#915eff] transition-colors duration-200"
                    >
                        ←
                    </button>

                    <p className="text-secondary text-sm">
                        {currentIndex + 1} / {testimonials.length}
                    </p>

                    <button
                        onClick={handleNext}
                        aria-label="Suivant"
                        className="w-10 h-10 rounded-full bg-black-200 text-white hover:bg-[#915eff] transition-colors duration-200"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SectionWrapper(Feedbacks, "");