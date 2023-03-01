import { useState } from 'react'
import { useRafInterval } from 'ahooks'
import _ from 'lodash'
import { ReactSVG } from 'react-svg'
import { motion, useAnimationFrame } from "framer-motion"

const SVGContainer = (props) => {
    const { style, initial } = props
    const {
        initialX,
        initialY,
        initialRotate,
        initialScale,
        initialOpacity,
        delta
    } = initial
    const [x, setX] = useState(initialX)
    const [y, setY] = useState(initialX)
    const [rotate, setRotate] = useState(initialRotate)
    const [scale, setScale] = useState(initialScale)
    const [opacity, setOpacity] = useState(initialOpacity)
    const [randomNumber, setRandomNumber] = useState(_.random(0.1, 0.5, true))
    const [ratio, setRatio] = useState(_.random(0.001, 0.005, true))
    const [minus, setMinus] = useState(_.random(-1, 1))
    const [clock, setClock] = useState(0)
    useAnimationFrame(time => setClock(time))
    useRafInterval(() => {
        const newX = (x + randomNumber * delta)
        const newY = initialY + Math.sin(clock * ratio) * randomNumber * minus
        const newRotate = rotate + Math.sin(clock * ratio) * randomNumber * minus
        const newScale = scale + Math.sin(clock * ratio) * randomNumber * minus * ratio

        setX(newX > 110 ? (100 - x) : newX)
        setY(newX > 110 ? _.random(-10, 110, true) : newY)
        setRotate(newX > 110 ? _.random(-15, 15, true) : newRotate)
        setScale(newX > 110 ? _.random(0.4, 1.4, true) : newScale)
        
        if (newY < 110) { return }
        setRandomNumber(_.random(0.1, 0.5, true))
        setRatio(_.random(0.001, 0.005, true))
        setMinus(_.random(-1, 1))
        setOpacity(_.random(0.1, 1, true))


    }, 10)
    const newStyle = {
        ...style,
        x: x + 'vw',
        y: y + 'vh',
        rotate,
        scale,
        opacity,
    }
    const animatedWrapper = (component) => <motion.div {...props} style={newStyle}>{component}</motion.div>
    return animatedWrapper(<ReactSVG src={props.src} />)
}
export default SVGContainer