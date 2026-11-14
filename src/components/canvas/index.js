import { lazy } from "react";

// Chargés à la demande : three.js et drei restent hors du fichier JavaScript principal.
const EarthCanvas = lazy(() => import("./Earth"));
// Ancienne grille d'icosaèdres, conservée pour revenir en arrière (voir TechBalls.jsx)
const BallCanvas = lazy(() => import("./Ball"));
const StackCanvas = lazy(() => import("./StackScene"));
const ComputersCanvas = lazy(() => import("./Computers"));
const StarsCanvas = lazy(() => import("./Stars"));

export { EarthCanvas, BallCanvas, StackCanvas, ComputersCanvas, StarsCanvas };
