import { useState } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  FeedbackPrompt,
} from "../components";
import Preloader from "../components/Preloader";

const Home = () => {

    return (
        <>
        <Preloader />
        
        <div className="bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            <Feedbacks />
            <div className="relative z-0">
                <Contact />
                <StarsCanvas />
            </div>

            {/* Message de feedback en position fixe */}
            <FeedbackPrompt />
        </div>
        </>
    )
}

export default Home