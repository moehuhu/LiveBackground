import { useMemo, useState } from 'react'
import _ from 'lodash'
import './style.less'
import SVGContainer from './SVGContainer'
import useSuncalcColor from '../../hooks/useSuncalcColor'
import useWeatherIcons from '../../hooks/useWeatherIcons'

const RenderSpringCanvas = (props) => {
    const background = useSuncalcColor()
    const count = 80
    const svgList = useWeatherIcons()
    const indexList = Array.from({ length: count }, (item, i) => i % _.size(svgList))
    const getCloudInstanceList = indexList => indexList?.map((item, i) => {
        const src = svgList[item]

        const style = {
            float: 'left',
            position: 'absolute',
        }

        const key = item + '-' + i
        return { style, key, src }
    })
    const cloudInstance = getCloudInstanceList(indexList)
    return <div className='react-spring-background' style={{ background }}>
        {cloudInstance?.map(props => <SVGContainer className={'svg-icon'} {...props} />)}
    </div>
}
export default RenderSpringCanvas;