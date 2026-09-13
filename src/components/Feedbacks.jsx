/* eslint-disable react-refresh/only-export-components */

import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ index, testimonial, name, designation, company }) => {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <motion.div
            variants={fadeIn("", "spring", index * 0.5, 0.75)}
            className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
        >
            <p className="text-white font-black text-[48px]">&quot;</p>

            <div className="mt-1">
                <p className="text-white tracking-wider text-[18px]">{testimonial}</p>
                <div className="mt-7 flex justify-between items-center gap-1">
                    <div className="flex-1 flex flex-col">
                        <p className="text-white font-medium text-[16px]">
                            <span className="blue-text-gradient">@</span> {name}
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
        </motion.div>
    );
}

FeedbackCard.propTypes = {
    index: PropTypes.number.isRequired,
    testimonial: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
}

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
        <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Ce que d&apos;autres disent</p>
                <h2 className={styles.sectionHeadText}>Feedback.</h2>
            </motion.div>
        </div>
        <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7`}>
            {testimonials.map((testimonial, index) => (
                <FeedbackCard
                    key={testimonial.name}
                    index={index}
                    {...testimonial}
                />
            ))}
        </div>
    </div>
  )
}

export default SectionWrapper(Feedbacks, "");