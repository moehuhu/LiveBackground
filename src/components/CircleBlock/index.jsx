import { Progress } from 'antd'
import _ from 'lodash'
export default function Block(props) {
    const index = _.get(props, 'index')
    const key = _.get(props, 'key')
    const percent = _.get(props, 'percent') || _.get(props, 'count')
    const style = _.get(props, 'style')
    const centerNode = _.get(props, 'centerNode')
    const circleStyle = _.assign({ width: 150 }, _.get(props, 'circleStyle'))

    return <div className={'block-item'} style={style} index={index} key={key}>
        <Progress
            percent={percent}
            {...circleStyle}
            type="circle"
            format={centerNode}
        />
    </div>
}