import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FeedbackPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Afficher le message après 3 secondes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const handleContactClick = () => {
    // Scroll vers la section contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsDismissed(true);
  };

  if (isDismissed || !isVisible) return null;

  const shakeAnimation = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      variants={shakeAnimation}
      // animate="shake"
      className="fixed bottom-6 right-2 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg shadow-2xl border border-purple-300/20 backdrop-blur-sm">
        {/* Bouton de fermeture */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
        >
          ×
        </button>

        {/* Icône */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg 
              className="w-8 h-8 text-yellow-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          {/* Contenu du message */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-2">
              Vous appréciez mon travail ? 💼
            </h3>
            <p className="text-purple-100 text-xs mb-3 leading-relaxed">
              Laissez-moi un message si vous avez profite de la visite ou si vous souhaitez collaborer !
            </p>
            
            {/* Boutons d'action */}
            <div className="flex gap-2">
              <button
                onClick={handleContactClick}
                className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-md transition-all duration-200 hover:scale-105 font-medium"
              >
                Me contacter
              </button>
              <button
                onClick={handleDismiss}
                className="text-purple-200 hover:text-white text-xs px-2 py-1.5 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>

        {/* Petite flèche décorative */}
        <div className="absolute -bottom-1 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
      </div>
    </motion.div>
  );
};

export default FeedbackPrompt;