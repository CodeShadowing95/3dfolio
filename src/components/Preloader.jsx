import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Intro « carte de visite » : ne dépend plus du chargement de la 3D,
// le hero s'affiche derrière les portes et la 3D y apparaît quand elle est prête.
const NAME = "Patrick NAMEGNI";
const OPEN_AT_MS = 1100;
const DOORS_DURATION_S = 0.6;

const doorEase = [0.76, 0, 0.24, 1];

const letters = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.035 } },
};

const letter = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.35, ease: "easeOut" },
});

const Preloader = ({ onLoadComplete }) => {
  const [opening, setOpening] = useState(false);
  const open = useCallback(() => setOpening(true), []);

  // Ouverture automatique, ou dès un clic / une touche
  useEffect(() => {
    const timer = setTimeout(open, OPEN_AT_MS);
    window.addEventListener("pointerdown", open);
    window.addEventListener("keydown", open);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", open);
      window.removeEventListener("keydown", open);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = setTimeout(() => {
      if (typeof onLoadComplete === "function") onLoadComplete();
    }, DOORS_DURATION_S * 1000 + 50);
    return () => clearTimeout(timer);
  }, [opening, onLoadComplete]);

  const doorTransition = { duration: DOORS_DURATION_S, ease: doorEase };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${opening ? "pointer-events-none" : "cursor-pointer"}`}
      aria-hidden="true"
    >
      {/* Portes */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-primary to-tertiary"
        animate={{ x: opening ? "-100%" : 0 }}
        transition={doorTransition}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-primary to-tertiary"
        animate={{ x: opening ? "100%" : 0 }}
        transition={doorTransition}
      />

      {/* Ligne lumineuse au centre, là où les portes s'ouvrent */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan to-transparent shadow-[0_0_24px_rgba(34,211,238,0.6)]"
        initial={{ scaleY: 0, opacity: 0.35 }}
        animate={opening ? { scaleY: 1, opacity: 0 } : { scaleY: 1, opacity: 0.35 }}
        transition={{ duration: opening ? 0.2 : 0.6, ease: "easeOut" }}
      />

      {/* Carte de visite */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.96 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full p-[2px] bg-gradient-to-br from-cyan to-accent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <img
            src="/avatar.webp"
            alt=""
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover"
          />
        </motion.div>

        <motion.h2
          className="mt-6 text-white font-black text-[34px] xs:text-[42px] sm:text-[56px] leading-tight"
          variants={letters}
          initial="hidden"
          animate="show"
        >
          {NAME.split("").map((char, i) => (
            <motion.span key={i} variants={letter} className="inline-block whitespace-pre">
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p className="mt-2 text-white-100 font-medium text-[18px] sm:text-[24px]" {...fadeUp(0.6)}>
          Développeur <span className="text-accent-light">Full-Stack</span>
        </motion.p>

        <motion.p
          className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/10 text-[13px] sm:text-[14px] text-white-100"
          {...fadeUp(0.75)}
        >
          <span className="w-2 h-2 rounded-full bg-cyan" />
          Disponible immédiatement · CDI
        </motion.p>
      </motion.div>

      {/* Indication discrète pour passer */}
      <motion.p
        className="absolute bottom-6 inset-x-0 text-center text-[12px] text-secondary/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: opening ? 0 : 0.5, duration: 0.3 }}
      >
        Cliquez ou appuyez sur une touche pour passer
      </motion.p>
    </div>
  );
};

Preloader.propTypes = {
  onLoadComplete: PropTypes.func,
};

export default Preloader;
