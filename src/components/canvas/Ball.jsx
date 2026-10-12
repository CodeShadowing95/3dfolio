/* eslint-disable react/no-unknown-property */

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Float, OrbitControls, PerspectiveCamera, useTexture, View } from "@react-three/drei";
import PropTypes from "prop-types";

const Ball = (props) => {
    const [decal] = useTexture([props.imgUrl]);

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            <ambientLight intensity={0.4} />

            <directionalLight position={[0, 0, 0.05]} />

            <mesh castShadow receiveShadow scale={2.75}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
                <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} flatShading map={decal} />
            </mesh>
        </Float>
    )
}

Ball.propTypes = {
    imgUrl: PropTypes.string.isRequired,
};

// Une "vue" par technologie : elle suit la position de son <div> dans la page
// mais dessine dans le canvas partagé, au lieu d'ouvrir son propre contexte WebGL.
const BallView = ({ icon, name }) => {
    const ref = useRef(null);
    const [domElement, setDomElement] = useState(null);

    useEffect(() => {
        setDomElement(ref.current);
    }, []);

    return (
        <View ref={ref} className="w-28 h-28 cursor-grab" aria-label={name}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            {domElement && <OrbitControls enableZoom={false} domElement={domElement} />}
            <Suspense fallback={null}>
                <Ball imgUrl={icon} />
            </Suspense>
        </View>
    )
}

BallView.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

// Le canvas ne redessine qu'à la demande : on le relance quand la page défile,
// pour que les boules suivent leur emplacement.
const RedrawOnScroll = () => {
    const invalidate = useThree((state) => state.invalidate);

    useEffect(() => {
        const handle = () => invalidate();
        window.addEventListener("scroll", handle, { passive: true });
        window.addEventListener("resize", handle);
        return () => {
            window.removeEventListener("scroll", handle);
            window.removeEventListener("resize", handle);
        };
    }, [invalidate]);

    // Efface tout le canvas avant que chaque vue ne se dessine,
    // sinon une boule sortie de l'écran laisserait une trace.
    useFrame((state) => {
        state.gl.setScissorTest(false);
        state.gl.clear(true, true);
    }, 0);

    return null;
}

const BallsCanvas = ({ technologies }) => {
    return (
        <>
            <div className="flex flex-row flex-wrap justify-center gap-10">
                {technologies.map((technology) => (
                    <BallView key={technology.name} icon={technology.icon} name={technology.name} />
                ))}
            </div>

            <Canvas
                frameloop="demand"
                dpr={[1, 1.75]}
                style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}
            >
                <RedrawOnScroll />
                <View.Port />
            </Canvas>
        </>
    )
}

BallsCanvas.propTypes = {
    technologies: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BallsCanvas
