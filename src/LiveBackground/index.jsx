import _ from 'lodash'
import { useInterval } from 'ahooks'
import { useState } from 'react'
import moment from 'moment'
import Typewriter from 'typewriter-effect';
import './style.less'
import ThreeDBackground from '../usedComponents/ThreeCloudBackground'
import ReactSpringBackground from '../components/ReactSpringBackground'

const App = () => {
    const [time, setTime] = useState('')
    useInterval(() => { setTime(moment().format('HH:mm:ss')) }, 500)

    const taskbar = (component) => <div className="taskbar"  >
        <div className='components'>{component}</div>
        <div className="taskbar-highlight" />
        <div className="taskbar-blur" />
    </div>

    const sidebar = (component) => <div className="sidebar-container" >
        <div className="sidebar-highlight" />
        <div className="sidebar-blur" />
    </div>
    const strings = [
        '季节更替 调整衣物',
        '理性消费 记得关注',
        '多喝热水 走出户外',
        '生活明朗 万物可爱',
    ]
    const typeWriter = <div className="typewriter">
        <Typewriter
            options={{
                strings,
                autoStart: true,
                loop: true,
                cursor: ''
            }}
        />
    </div>
    const timeClock = <div className="time">{time}</div>
    return <div className="live-background">
        {sidebar()}
        {taskbar(<>{typeWriter}{timeClock}</>)}
        <ReactSpringBackground />
    </div>
}

export default App;