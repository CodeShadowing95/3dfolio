import React, { Suspense, useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
extend({ OrbitControls });

import CanvasLoader from '../Loader';

const Computers = () => {
    const computer = useGLTF("./desktop_pc/scene.glb");

    return (
        <mesh>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <hemisphereLight intensity={3} groundColor="black" />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight intensity={4} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <primitive object={computer.scene} scale={0.75} position={[0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} />
        </mesh>
    )
}

const ComputersCanvas = () => {
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
                <Computers />
            </Suspense>

            <Preload all />
        </Canvas>
    )
}

export default ComputersCanvas