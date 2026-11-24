"use client";

import { useCallback, useEffect, useState } from "react";
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
import Footer from "../components/Footer";

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

// La page est générée à l'avance avec l'intro : un petit script dans <head> (voir app/layout.jsx)
// la masque avant l'affichage quand elle n'a pas à jouer, puis on la retire ici.
const Home = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture côté navigateur après le montage (page générée en statique)
        if (!shouldPlayIntro()) setShowPreloader(false);
    }, []);

    const hidePreloader = useCallback(() => {
        preloaderDone = true;
        document.documentElement.dataset.intro = "skip";
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
            <Navbar />
            {/* Ouverture : ciel étoilé léger et halo violet derrière le hero et les chiffres clés */}
            <div className="relative overflow-hidden">
                <div className="hero-sky absolute inset-0 pointer-events-none" aria-hidden="true" />
                <div
                    className="absolute -right-[10%] -top-[10%] w-[70%] h-[90%] pointer-events-none bg-[radial-gradient(closest-side,rgba(128,77,238,0.28),transparent)]"
                    aria-hidden="true"
                />
                <Hero />
                <KeyAchievements />
            </div>
            <About />
            <Works />
            <Experience />
            <Tech />
            <Education />
            {/* Section Feedback masquée en attendant des recommandations LinkedIn */}
            <div className="relative z-0">
                <Contact />
                <Footer />
                <LazyOnView className="absolute inset-0 z-[-1]">
                    <StarsCanvas />
                </LazyOnView>
            </div>

            {/* Bouton « remonter en haut » en position fixe */}
            <FeedbackPrompt />
        </div>
        </>
    )
}

export default Home
