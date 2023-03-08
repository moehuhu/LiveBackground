import _ from 'lodash'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { Canvas, useLoader, events } from '@react-three/fiber'
import { ObjectContainer } from './ObjectContainer'

import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import cloud1 from '../../../assets/svgs/weather/cloud1.svg'
import cloud2 from '../../../assets/svgs/weather/cloud2.svg'
import cloud3 from '../../../assets/svgs/weather/cloud3.svg'
import { useCallback } from 'react'
const material = new THREE.MeshLambertMaterial();

const getGemo = (path) => {
    const rawGemo = SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), { strokeWidth: 30 })
    rawGemo.scale(0.001, 0.001, 0.001)
    rawGemo.rotateZ(Math.PI)
    return rawGemo
}

const RenderCanvas = ({ count = 200, depth = 80 }) => {
    const { paths: [cloud1Path] } = useLoader(SVGLoader, cloud1)
    const { paths: [cloud2Path] } = useLoader(SVGLoader, cloud2)
    const { paths: [cloud3Path] } = useLoader(SVGLoader, cloud3)
    const cloud1Gemo = useMemo(() => getGemo(cloud1Path), [])
    const cloud2Gemo = useMemo(() => getGemo(cloud2Path), [])
    const cloud3Gemo = useMemo(() => getGemo(cloud3Path), [])
    const geometryList = useMemo(() => [cloud1Gemo, cloud2Gemo, cloud3Gemo], [cloud1Gemo, cloud2Gemo, cloud3Gemo])
    const indexList = useMemo(() => Array.from({ length: count }, (item, i) => i % _.size(geometryList)), [geometryList])
    const cloudList = useMemo(() => indexList?.map((item, i) => <ObjectContainer key={i} index={i} z={(i / count) * depth + 20} geometry={geometryList[indexList[i]]} material={material} />), [])
    const canvasRef = useRef()
    const threeDCanvas = useCallback(component => <Canvas
        id={'three-d-canvas'}
        ref={canvasRef}
        shadows
        gl={{ alpha: true, antialias: false }}
        position={[0, 0, 10]}
        camera={{ near: 0.01, far: 110, fov: 40 }}
        dpr={[1, 1.5]}
    >
        {component}
    </Canvas>, [])
    const canvasElement = document.getElementsByTagName('canvas')[0]
    canvasElement?.addEventListener("webglcontextlost", () => window.location.reload())
    const blue = "#8abff4"
    const night = "#461d6b"
    const color = <color attach="background" args={[blue]} />

    const light = <>
        <spotLight position={[50, 10, 10]} penumbra={1} intensity={1} />
        <ambientLight intensity={1} />
    </>

    const effectComposer = <EffectComposer multisampling={0}>
        <DepthOfField
            target={[0, 0, 30]}
            focalLength={1.5}
            bokehScale={10}
            height={700}
        />
    </EffectComposer>

    return threeDCanvas(<>
        {color}
        {light}
        {cloudList}
        {effectComposer}
    </>)

};


export default RenderCanvas;
