import _ from 'lodash'
import { ReactSVG } from 'react-svg'
import { useSpring, animated } from '@react-spring/web'
import { motion } from "framer-motion"

const SVGContainer = (props) => {
    const animatedWrapper = (component) => <motion.div {...props}>{component}</motion.div>
    return animatedWrapper(<ReactSVG src={props.src} />)
}
export default SVGContainer