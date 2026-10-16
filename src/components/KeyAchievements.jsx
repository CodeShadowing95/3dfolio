import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { keyAchievements } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const KeyAchievements = () => {
  return (
    <section className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Impact</p>
        <h2 className={styles.sectionHeadText}>Réalisations chiffrées.</h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {keyAchievements.map((achievement, index) => (
          <motion.article
            key={achievement.value}
            variants={fadeIn("up", "spring", 0.15 * index, 0.75)}
            className="relative bg-tertiary rounded-2xl p-6 border border-white/10 flex flex-col has-[a:hover]:border-cyan/60 transition-colors"
          >
            <p className="text-[36px] font-black text-white leading-none">{achievement.value}</p>
            <p className="mt-3 text-secondary text-[15px] leading-6">{achievement.label}</p>
            {achievement.link && (
              // Toute la carte est cliquable grâce au pseudo-élément du lien
              <Link
                to={achievement.link.to}
                className="mt-4 text-cyan text-[14px] font-semibold hover:underline after:absolute after:inset-0 after:rounded-2xl"
              >
                {achievement.link.label} →
              </Link>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default KeyAchievements;