import { useCallback, useState } from "react";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  FeedbackPrompt,
  KeyAchievements,
  Education,
} from "../components";
import { StarsCanvas } from "../components/canvas";
import LazyOnView from "../components/LazyOnView";
import Preloader from "../components/Preloader";

// L'intro ne joue qu'une fois par visite (pas en revenant d'une page projet ni en rechargeant),
// et jamais si le visiteur a demandé moins d'animations
const INTRO_KEY = "introSeen";
let preloaderDone = false;

const shouldPlayIntro = () => {
    if (preloaderDone) return false;
    try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
        if (sessionStorage.getItem(INTRO_KEY)) return false;
    } catch {
        // Stockage indisponible (navigation privée stricte) : on joue l'intro
    }
    return true;
};

const Home = () => {
    const [showPreloader, setShowPreloader] = useState(shouldPlayIntro);
    const hidePreloader = useCallback(() => {
        preloaderDone = true;
        try {
            sessionStorage.setItem(INTRO_KEY, "1");
        } catch {
            // Rien à faire : l'intro rejouera simplement au prochain chargement
        }
        setShowPreloader(false);
    }, []);

    return (
        <>
        {showPreloader && <Preloader onLoadComplete={hidePreloader} />}

        <div className="bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
            </div>
            <KeyAchievements />
            <About />
            <Works />
            <Experience />
            <Education />
            <Tech />
            {/* Section Feedback masquée en attendant des recommandations LinkedIn */}
            <div className="relative z-0">
                <Contact />
                <LazyOnView className="absolute inset-0 z-[-1]">
                    <StarsCanvas />
                </LazyOnView>
            </div>

            {/* Message de feedback en position fixe */}
            <FeedbackPrompt />
        </div>
        </>
    )
}

export default Home
