import { useState } from 'react'
import { useRafInterval } from 'ahooks'
import _ from 'lodash'
import { ReactSVG } from 'react-svg'
import { motion, useAnimationFrame } from "framer-motion"

const SVGContainer = (props) => {
    const getX = () => _.random(-10, 110, true)
    const getY = () => _.random(-10, 110, true)
    const getRotate = () => _.random(-15, 15, true)
    const getScale = () => _.random(0.4, 1.4, true)
    const getOpacity = () => _.random(0.1, 1, true)
    const getRandomNumber = () => _.random(0.01, 0.05, true)
    const getRatio = () => _.random(0.001, 0.005, true)
    const getMinus = () => _.random(-1, 1)

    const { style } = props
    const [x, setX] = useState(getX())
    const [y, setY] = useState(getY())
    const [rotate, setRotate] = useState(getRotate())
    const [scale, setScale] = useState(getScale())
    const [opacity, setOpacity] = useState(getOpacity())
    const [delta, setDelta] = useState(getRandomNumber())
    const [ratio, setRatio] = useState(getRatio())
    const [minus, setMinus] = useState(getMinus())
    const [clock, setClock] = useState(0)

    useAnimationFrame(time => setClock(time))
    useRafInterval(() => {
        const breath = () => Math.sin(clock * ratio) * minus * getRandomNumber() ** 2
        const newX = x > 110 ? (90 - x) : (x + delta)
        const newY = x > 110 ? getY() : y + breath() * 10
        const newRotate = x > 110 ? getRotate() : rotate + breath() * 100
        const newScale = x > 110 ? getScale() : scale + breath()
        
        if (x > 110) {
            setDelta(getRandomNumber())
            setRatio(getRatio())
            setMinus(getMinus())
            setOpacity(getOpacity())
        }
        
        setX(newX)
        setY(newY)
        setRotate(newRotate)
        setScale(newScale)

    }, 10)
    const newStyle = {
        ...style,
        x: x + 'vw',
        y: y + 'vh',
        rotate,
        scale,
        opacity,
    }
    const animatedWrapper = (component) => <motion.div className={props.className} style={newStyle}>{component}</motion.div>
    return animatedWrapper(<ReactSVG src={props.src} />)
}
export default SVGContainer