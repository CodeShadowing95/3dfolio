import { useCallback, useState } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  FeedbackPrompt,
    KeyAchievements,
} from "../components";
import { StarsCanvas } from "../components/canvas";
import LazyOnView from "../components/LazyOnView";
import Preloader from "../components/Preloader";

const Home = () => {
    const [showPreloader, setShowPreloader] = useState(true);
    const hidePreloader = useCallback(() => setShowPreloader(false), []);

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
            <Experience />
            <Tech />
            <Works />
            <Feedbacks />
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
