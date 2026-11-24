"use client";

import { lazy } from "react";

// Chargés à la demande : three.js et drei restent hors du fichier JavaScript principal.
const HeroCoreCanvas = lazy(() => import("./HeroCore"));
const EarthCanvas = lazy(() => import("./Earth"));
// Ancienne grille d'icosaèdres, conservée pour revenir en arrière (voir TechBalls.jsx)
const BallCanvas = lazy(() => import("./Ball"));
const StarsCanvas = lazy(() => import("./Stars"));

export { HeroCoreCanvas, EarthCanvas, BallCanvas, StarsCanvas };
