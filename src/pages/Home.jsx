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

// Le preloader ne s'affiche qu'au premier chargement, pas en revenant d'une page projet
let preloaderDone = false;

const Home = () => {
    const [showPreloader, setShowPreloader] = useState(!preloaderDone);
    const hidePreloader = useCallback(() => {
        preloaderDone = true;
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
