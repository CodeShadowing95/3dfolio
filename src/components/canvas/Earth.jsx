/* eslint-disable react/no-unknown-property */

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
import useInViewport from '../../hooks/useInViewport';

const Earth = () => {
    const earth = useGLTF('./planet/scene.glb');

    return (
        <primitive
            object={earth.scene}
            scale={2.0}
            position-y={0}
            rotation-y={0}
        />
    )
}

const EarthCanvas = () => {
    const containerRef = useRef(null);
    const isVisible = useInViewport(containerRef);

    return (
        <div ref={containerRef} className="w-full h-full">
            <Canvas
                // La planète tourne en continu : on coupe le rendu quand elle n'est plus à l'écran
                frameloop={isVisible ? 'always' : 'never'}
                dpr={[1, 1.75]}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-4, 3, 6],
                }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        autoRotate
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />

                    <Earth />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default EarthCanvas
