import { useFrame, useThree } from "@react-three/fiber ";
import { Detailed, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import niceColors from 'nice-color-palettes'

export const ObjectContainer = ({ index, z, geometry, material }) => {
    const ref = useRef();
    const { viewport, camera } = useThree();
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
        spin: THREE.MathUtils.randFloat(8, 12),
        scale: 1
    });

    useFrame((state, dt) => {
        if (dt < 0.1)
            ref.current.position.set(
                index === 0 ? 0 : data.x * width,
                (data.y += dt * 0.5),
                -z
            );


        ref.current.rotation.set(
            (data.rX += dt / data.spin),
            Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
            (data.rZ += dt / data.spin)
        );

        if (data.y > height * (index === 0 ? 4 : 1))
            data.y = -(height * (index === 0 ? 4 : 1));
    });

    return (
        <Detailed
            distances={[0, 0, 80]}
            ref={ref}
            scale={3.5}
        >
            <mesh geometry={geometry} material={material} />
        </Detailed>
    );
};
