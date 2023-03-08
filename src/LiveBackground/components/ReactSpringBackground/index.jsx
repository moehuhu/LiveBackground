import { useMemo, useState } from 'react'
import _ from 'lodash'
import './style.less'
import cup from '../../../assets/svgs/茶杯.svg'
import eat from '../../../assets/svgs/吃饭.svg'
import code from '../../../assets/svgs/代码.svg'
import crystal from '../../../assets/svgs/晶体.svg'
import mushroom from '../../../assets/svgs/蘑菇.svg'
import tree from '../../../assets/svgs/树.svg'
import question from '../../../assets/svgs/问号.svg'
import wave from '../../../assets/svgs/线性波浪.svg'
import bridge from '../../../assets/svgs/小桥.svg'
import bottle from '../../../assets/svgs/锥形瓶.svg'
import walk from '../../../assets/svgs/走.svg'
import SVGContainer from './SVGContainer'
import useSuncalcColor from '../../../hooks/useSuncalcColor'
import useWeatherIcons from '../../../hooks/useWeatherIcons'

const RenderSpringCanvas = (props) => {
    const background = useSuncalcColor()
    const count = 80
    const svgList = useWeatherIcons()
    const [indexList, setIndexList] = useState(Array.from({ length: count }, (item, i) => i % _.size(svgList)))
    const getCloudInstanceList = indexList => indexList?.map((item, i) => {
        const src = svgList[item]

        const style = {
            float: 'left',
            position: 'absolute',
        }

        const key = item + '-' + i
        return { style, key, src }
    })
    const [cloudInstance, setCloudInstance] = useState(getCloudInstanceList(indexList))
    return <div className='react-spring-background' style={{ background }}>
        {cloudInstance?.map(props => <SVGContainer className={'svg-icon'} {...props} />)}
    </div>
}
export default RenderSpringCanvas;