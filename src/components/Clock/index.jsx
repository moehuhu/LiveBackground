import React, { useState } from 'react';
import { useInterval } from 'ahooks';
import moment from 'moment'
import CircleBlock from '../CircleBlock'
import './style.less'

export default function Clock(props) {
    const [count, setCount] = useState(0)
    const digitalClock = () => <div className='digital-clock'>
        {moment().format('HH:mm:ss')}
    </div>
    const percent = 100 * ((moment().second() + 0.4) / 60)
    const circleStyle = { strokeColor: '#8ABFF4', success: { strokeColor: '#8ABFF4' } }
    useInterval(() => setCount(percent), 500)
    return <CircleBlock className='clock' {...props} centerNode={digitalClock} circleStyle={circleStyle} count={count} />
}