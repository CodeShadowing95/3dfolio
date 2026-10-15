/* eslint-disable react-refresh/only-export-components */

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from "../utils/motion";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const ExperienceCard = ({ experience }) => {
    // Basic runtime validation (optional but helpful)
    if (!experience || typeof experience !== 'object') {
        console.warn('ExperienceCard expects a valid experience object');
        return null;
    }
    return (
        <VerticalTimelineElement
            contentStyle={{ background: "#1d1836", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #232631" }}
            date={experience.date}
            iconStyle={{ background: experience.iconBg }}
            icon={
            <div className="flex justify-center items-center w-full h-full">
                <img
                    src={experience.icon}
                    alt={experience.company_name}
                    loading="lazy"
                    className="w-[90%] h-[90%] object-contain rounded-full"
                />
            </div>
        }
    >
        <div>
            <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
            <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>{experience.company_name}</p>
            {experience.location && (
                <p className="text-secondary text-[14px]" style={{ margin: 0 }}>{experience.location}</p>
            )}
        </div>

        <ul className="mt-5 list-disc ml-5 space-y-2">
            {experience.points.map((point, index) => (
                <li
                    key={`experience-point-${index}`}
                    className="text-white-100 text-[15px] leading-6 pl-1"
                >
                    {point}
                </li>
            ))}
        </ul>

        {experience.caseStudy && (
            <Link
                to={experience.caseStudy.to}
                className="inline-block mt-4 text-accent-light text-[14px] font-semibold hover:underline"
            >
                {experience.caseStudy.label} →
            </Link>
        )}

        {experience.stack && (
            <p className="mt-4 text-[13px] text-secondary" style={{ margin: "16px 0 0" }}>
                <span className="font-semibold text-white-100">Stack : </span>{experience.stack}
            </p>
        )}
    </VerticalTimelineElement>
)}

ExperienceCard.propTypes = {
    experience: PropTypes.shape({
        date: PropTypes.string.isRequired,
        iconBg: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        company_name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        points: PropTypes.arrayOf(PropTypes.string).isRequired,
        location: PropTypes.string,
        stack: PropTypes.string,
        caseStudy: PropTypes.shape({ to: PropTypes.string, label: PropTypes.string }),
    }).isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
const Experience = () => {
  return (
    <>
        <motion.div
            variants={textVariant()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative z-10"
        >
            <p className={styles.sectionSubText}>Ce que j&apos;ai fait jusque là</p>
            <h2 className={styles.sectionHeadText}>Expériences pro.</h2>
        </motion.div>

        <div className="mt-20 flex flex-col">
            <VerticalTimeline>
                {experiences.map((experience, index) => (
                    <ExperienceCard key={index} experience={experience} />
                ))}
            </VerticalTimeline>
        </div>
    </>
  )
}

export default SectionWrapper(Experience, "expérience");