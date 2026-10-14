import { motion } from "framer-motion";

import { styles } from "../styles";
import { education, languages } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Parcours académique</p>
        <h2 className={styles.sectionHeadText}>Formation.</h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {education.map((item, index) => (
          <motion.article
            key={item.degree}
            variants={fadeIn("up", "spring", 0.15 * index, 0.75)}
            className="bg-tertiary rounded-2xl p-6 border border-white/10 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-secondary text-[14px] font-medium">{item.years}</p>
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-accent/15 text-accent-light border border-accent/30">
                {item.level}
              </span>
            </div>
            <h3 className="text-white text-[18px] font-bold leading-snug">{item.degree}</h3>
            <p className="text-white-100 text-[15px]">{item.school}</p>
            {item.note && <p className="mt-auto text-accent-light text-[14px] font-semibold">{item.note}</p>}
          </motion.article>
        ))}
      </div>

      <motion.div variants={fadeIn("up", "spring", 0.5, 0.75)} className="mt-10 flex flex-wrap items-center gap-3">
        <h3 className="text-white text-[18px] font-bold mr-2">Langues</h3>
        <ul className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <li
              key={language.name}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white-100 text-[14px]"
            >
              {language.name} <span className="text-secondary">· {language.level}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, "formation");
