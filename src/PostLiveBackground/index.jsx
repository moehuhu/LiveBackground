import _ from 'lodash'
import { useInterval, useTimeout } from 'ahooks'
import { useState } from 'react'
import moment from 'moment'
import Typewriter from 'typewriter-effect';
import './style.less'
import ReactSpringBackground from '../components/ReactSpringBackground'
import ThreeDBackground from '../usedComponents/ThreeCloudBackground'
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
    const typeWriter = <div className="typewriter">
        <Typewriter
            options={{
                strings: ['下播咯', '秋天到了', '气温波动', '多喝热水', '调整衣物'],
                autoStart: true,
                loop: true,
                cursor: '...'
            }}
        />
    </div>
    const timeClock = <div className="time">{time}</div>
    return <div className="post-live-background">
        {sidebar()}
        {taskbar(<>{typeWriter}{timeClock}</>)}
        <ReactSpringBackground />
    </div>
}



export default App;