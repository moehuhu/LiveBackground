import _ from 'lodash'
import { useInterval, useTimeout } from 'ahooks'
import { useState } from 'react'
import moment from 'moment'
import Typewriter from 'typewriter-effect';
import './style.less'
import ThreeDBackground from '../usedComponents/ThreeBackground'
const App = () => {
    const [time, setTime] = useState('')
    useInterval(() => { setTime(moment().format('HH:mm:ss')) }, 500)
    useTimeout(() => window.location.reload(), 600000)
    const taskbar = (component) => <div className="taskbar"  >
        <div className='components'>{component}</div>
        <div className="taskbar-highlight" />
        <div className="taskbar-blur" />
    </div>

    const sidebar = (component) => <div className="sidebar-container" >
        <div className="sidebar-highlight" />
        <div className="sidebar-blur" />
    </div>
    const typeWriter = <div className="typewriter">
        <Typewriter
            options={{
                strings: ['准备中', 'READY', '春天到了', '气温波动', '调整衣物', '多喝热水'],
                autoStart: true,
                loop: true,
                cursor: ' ...'
            }}
        />
    </div>
    const timeClock = <div className="time">{time}</div>
    return <div className="pre-live-background">
        {sidebar()}
        {taskbar(<>{typeWriter}{timeClock}</>)}
        <ThreeDBackground />
    </div>
}



export default App;