import { useMemo, useState } from 'react'
import _ from 'lodash'
import './style.less'
import cloud1 from '../../../assets/svgs/cloud1.svg'
import cloud2 from '../../../assets/svgs/cloud2.svg'
import cloud3 from '../../../assets/svgs/cloud3.svg'
import cup from '../../../assets/svgs/茶杯.svg'
import eat from '../../../assets/svgs/吃饭.svg'
import code from '../../../assets/svgs/代码.svg'
import crystal from '../../../assets/svgs/晶体.svg'
import mushroom from '../../../assets/svgs/蘑菇.svg'
import tree from '../../../assets/svgs/树.svg'
import sleep from '../../../assets/svgs/睡眠.svg'
import sun from '../../../assets/svgs/太阳.svg'
import question from '../../../assets/svgs/问号.svg'
import wave from '../../../assets/svgs/线性波浪.svg'
import bridge from '../../../assets/svgs/小桥.svg'
import bottle from '../../../assets/svgs/锥形瓶.svg'
import walk from '../../../assets/svgs/走.svg'
import SVGContainer from './SVGContainer'

const RenderSpringCanvas = (props) => {
    const blue = "#8abff4"
    const night = "#461d6b"
    const count = 80
    const [svgList, setSVGList] = useState([
        sleep,
        sun,
        cloud1,
        cloud2,
        cloud3
    ])
    const [indexList, setIndexList] = useState(Array.from({ length: count }, (item, i) => i % _.size(svgList)))
    const getCloudInstanceList = indexList => indexList?.map((item, i) => {
        const src = svgList[item]
        const initialX = _.random(-10, 110, true)
        const initialY = _.random(-10, 110, true)
        const initialRotate = _.random(-15, 15, true)
        const initialScale = _.random(0.4, 1.4, true)
        const initialOpacity = _.random(0.1, 1, true)
        const delta = _.random(0.05, 0.2, true)

        const style = {
            float: 'left',
            position: 'absolute',
        }
        const initial = {
            initialX,
            initialY,
            initialRotate,
            initialScale,
            initialOpacity,
            delta
        }
        const animate = {}
        const transition = {
            duration: _.random(1, 100, true),
            repeat: Infinity
        }
        const key = item + '-' + i
        return { style, initial, animate, transition, key, src }
    })
    const [cloudInstance, setCloudInstance] = useState(getCloudInstanceList(indexList))
    return <div className='react-spring-background' style={{ background: blue }}>
        {cloudInstance?.map(props => <SVGContainer className={'svg-icon'} {...props} />)}
    </div>
}
export default RenderSpringCanvas;