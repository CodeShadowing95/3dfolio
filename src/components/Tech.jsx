import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import LazyOnView from "./LazyOnView";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";

const MOBILE_QUERY = "(max-width: 767px)";

// Logos à plat : affichés sur mobile, et sur desktop tant que la 3D n'est pas chargée
const FlatLogos = () => (
  <ul className="flex flex-row flex-wrap justify-center gap-6 md:gap-10">
    {technologies.map((technology) => (
      <li key={technology.name} className="w-20 md:w-28 flex flex-col items-center gap-2">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#fff8eb] flex items-center justify-center">
          <img src={technology.icon} alt="" loading="lazy" className="w-1/2 h-1/2 object-contain" />
        </div>
        <span className="text-secondary text-[13px] text-center md:hidden">{technology.name}</span>
      </li>
    ))}
  </ul>
);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const handle = (event) => setIsMobile(event.matches);
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, []);

  return isMobile;
};

// eslint-disable-next-line react-refresh/only-export-components
const Tech = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <motion.div variants={textVariant()} className="mb-12">
        <p className={styles.sectionSubText}>Technologies</p>
        <h2 className={styles.sectionHeadText}>Stack technique.</h2>
      </motion.div>

      {isMobile ? (
        <FlatLogos />
      ) : (
        <LazyOnView fallback={<FlatLogos />}>
          <BallCanvas technologies={technologies} />
        </LazyOnView>
      )}
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Tech, "stack");
