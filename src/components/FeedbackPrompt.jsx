import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Part de la page à faire défiler avant d'afficher le bouton
const SCROLL_THRESHOLD = 0.15;

// Bouton « remonter en haut », affiché après un peu de défilement
const FeedbackPrompt = () => {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > scrollable * SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    // z-[15] : sous la navbar (z-20) et son menu mobile, au-dessus du contenu
    <div className="fixed bottom-6 right-6 z-[15]">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Remonter en haut de la page"
            title="Remonter en haut"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.6, y: prefersReduced ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.6, y: prefersReduced ? 0 : 20 }}
            whileHover={prefersReduced ? undefined : { scale: 1.1 }}
            whileTap={prefersReduced ? undefined : { scale: 0.95 }}
            className="relative w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 flex items-center justify-center group overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-cyan before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-purple-500/20 before:rounded-full before:-z-10 after:absolute after:inset-0 after:bg-gradient-to-tl after:from-blue-500/10 after:via-transparent after:to-purple-600/10 after:rounded-full after:-z-10"
          >
            <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>

            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackPrompt;
