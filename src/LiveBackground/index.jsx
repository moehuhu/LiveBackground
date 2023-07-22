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
        '春天到了 气温波动',
        '调整衣物 多喝热水',
        '不要在无关的直播间刷主播',
        '理性消费 鼓励白嫖 欢迎辣条',
        '打多了主播点名批评',
        '舰长记得及时退包月',
        '未成年人快去学习'
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