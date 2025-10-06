import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackPrompt = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = (document.documentElement.scrollHeight - window.innerHeight);
      const threshold = scrollable * 0.15; // quart de la page
      setShowScrollTop(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMessage = () => {
    setIsMessageVisible(!isMessageVisible);
  };

  const handleContactClick = () => {
    // Scroll vers la section contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMessageVisible(false);
  };

  const shakeAnimation = {
    shake: {
      rotate: [0, -5, 5, -5, 5, 0],
      scale: [1, 1.05, 1, 1.05, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 2
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const messageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      x: 50,
      y: 20,
      rotate: 15
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      x: 50,
      y: 20,
      rotate: -15,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="relative w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 flex items-center justify-center group overflow-hidden mb-3 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-purple-500/20 before:rounded-full before:-z-10 after:absolute after:inset-0 after:bg-gradient-to-tl after:from-blue-500/10 after:via-transparent after:to-purple-600/10 after:rounded-full after:-z-10"
          >
            <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            
            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bouton icône principal */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={toggleMessage}
        className="relative w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 flex items-center justify-center group overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-purple-500/20 before:rounded-full before:-z-10 after:absolute after:inset-0 after:bg-gradient-to-tl after:from-blue-500/10 after:via-transparent after:to-purple-600/10 after:rounded-full after:-z-10"
      >
        <motion.div
          variants={shakeAnimation}
          animate="shake"
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: isMessageVisible ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMessageVisible ? (
              <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <img 
                src="../assets/messages-icon.png"
                alt="Feedback"
                className="w-8 h-8 drop-shadow-sm" 
              />
            )}
          </motion.div>
        </motion.div>
        
        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </motion.button>

      {/* Message qui apparaît/disparaît */}
      <AnimatePresence>
        {isMessageVisible && (
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-16 right-0"
          >
            <div className="relative bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-purple-500/20 before:rounded-2xl before:-z-10 after:absolute after:inset-0 after:bg-gradient-to-tl after:from-blue-500/10 after:via-transparent after:to-purple-600/10 after:rounded-2xl after:-z-10">
              
              {/* Contenu du message */}
              <div className="relative z-10">
                <h3 className="text-white font-semibold text-sm whitespace-nowrap mb-2 drop-shadow-sm">
                  Vous appréciez mon travail ?
                </h3>
                <p className="text-white/90 text-xs mb-3 leading-relaxed drop-shadow-sm">
                  Laissez un message si mon travail et expériences vous ont captivé ou si vous avez des opportunités de collaboration !
                </p>
                
                {/* Boutons d'action */}
                <div className="flex gap-2">
                  <button
                    onClick={handleContactClick}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 font-medium border border-white/30 shadow-lg hover:shadow-xl"
                  >
                    Me contacter
                  </button>
                  <button
                    onClick={toggleMessage}
                    className="text-white/80 hover:text-white text-xs px-2 py-1.5 transition-all duration-200 hover:bg-white/10 rounded-lg backdrop-blur-sm"
                  >
                    Fermer
                  </button>
                </div>
              </div>

              {/* Petite flèche décorative */}
              <div className="absolute -bottom-1.5 right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/30 drop-shadow-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackPrompt;