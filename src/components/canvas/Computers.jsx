import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// extend({ OrbitControls });

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
    // const computer = useGLTF("./desktop_pc/scene.glb");
    const { scene } = useGLTF("./desktop_pc/scene.glb");

    return (
        <mesh>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <hemisphereLight intensity={3} groundColor="black" />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight intensity={4} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <primitive object={scene} scale={isMobile ? 0.45 : 0.70} position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} />
            {/* <primitive object={computer.scene} scale={isMobile ? 0.55 : 0.6} position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} /> */}
        </mesh>
    )
}

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia('(max-width: 700px)');

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for the changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, []);
    

    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            {/* CanvasLoader is useful because we don't need the canvas to break each time we reloading the page */}
            <Suspense fallback={<CanvasLoader/>}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    )
}

export default ComputersCanvas