import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
// extend({ OrbitControls });

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
    const { scene } = useGLTF("./desktop_pc/scene.glb");

    return (
        <mesh>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <hemisphereLight intensity={3} groundColor="black" />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight intensity={4} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <primitive object={scene} scale={isMobile ? 0.45 : 0.65} position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} />
            {/* <primitive object={computer.scene} scale={isMobile ? 0.55 : 0.6} position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} /> */}
        </mesh>
    )
}

Computers.propTypes = {
    isMobile: PropTypes.bool.isRequired,
};

const ComputersCanvas = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isLowEndDevice, setIsLowEndDevice] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const resumeTimeoutRef = useRef(null);

    useEffect(() => {
        // Detect low-end devices based on memory, cores, and user preferences
        const detectLowEnd = () => {
            const memory = navigator.deviceMemory ?? 8;
            const cores = navigator.hardwareConcurrency ?? 8;
            const saveData = navigator.connection?.saveData === true;
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            return saveData || reducedMotion || memory <= 2 || cores <= 2;
        };

        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia('(max-width: 700px)');

        // Set the initial value of the `isMobile`, `isLowEndDevice`, and `autoRotate` state variables
        setIsMobile(mediaQuery.matches);
        setIsLowEndDevice(detectLowEnd());
        setAutoRotate(!mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
            setAutoRotate(!event.matches);
            setIsLowEndDevice(detectLowEnd());
        };

        // Add the callback function as a listener for the changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                // Une fois chargée, la scène reste montée ; seul le rendu est mis en pause hors écran
                if (entry.isIntersecting) setIsInViewport(true);
            },
            { rootMargin: '200px 0px' }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    // Nettoyage du timeout de reprise au démontage
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, []);

    const handleInteractionStart = () => {
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
        setAutoRotate(false);
    };

    const handleInteractionEnd = () => {
        // Reprend l'auto-rotation après un court délai une fois l'interaction terminée
        if (isMobile) return;

        resumeTimeoutRef.current = setTimeout(() => {
            setAutoRotate(true);
        }, 2000);
    };

    const shouldDisable3D = isLowEndDevice;

    let content = null;

    if (shouldDisable3D) {
        content = (
            <div className="w-full h-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#10131f] via-[#0f172a] to-[#1a1b2e] flex items-center justify-center">
                <div className="px-6 text-center">
                    <p className="text-white/90 text-sm sm:text-base font-medium">Mode performance activé</p>
                    <p className="mt-2 text-white/60 text-xs sm:text-sm">La scène 3D est désactivée sur cet appareil pour de meilleures performances.</p>
                </div>
            </div>
        );
    } else if (isInViewport) {
        content = (
            <Canvas
                // Rendu coupé quand le hero n'est plus à l'écran
                frameloop={!isVisible ? "never" : autoRotate ? "always" : "demand"}
                dpr={isMobile ? [1, 1.25] : [1, 1.75]}
                camera={{ position: [20, 3, -5], fov: 25 }}
                gl={{ preserveDrawingBuffer: false, antialias: !isMobile, powerPreference: "high-performance" }}
            >
                {/* CanvasLoader is useful because we don't need the canvas to break each time we reloading the page */}
                <Suspense fallback={<CanvasLoader/>}>
                    <OrbitControls
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                        autoRotate={!isMobile && autoRotate}
                        autoRotateSpeed={1.5}
                        enableDamping={!isMobile}
                        onStart={handleInteractionStart}
                        onEnd={handleInteractionEnd}
                    />
                    <Computers isMobile={isMobile} />
                </Suspense>
            </Canvas>
        );
    }

    // Conteneur stable : l'observateur de visibilité reste branché sur le même élément
    return (
        <div ref={containerRef} className="w-full h-full">
            {content}
        </div>
    )
}

export default ComputersCanvas
