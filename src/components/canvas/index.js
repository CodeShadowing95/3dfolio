import { lazy } from "react";

// Chargés à la demande : three.js et drei restent hors du fichier JavaScript principal.
const EarthCanvas = lazy(() => import("./Earth"));
const BallCanvas = lazy(() => import("./Ball"));
const ComputersCanvas = lazy(() => import("./Computers"));
const StarsCanvas = lazy(() => import("./Stars"));

export { EarthCanvas, BallCanvas, ComputersCanvas, StarsCanvas };
