import { useInterval } from 'ahooks';
import Clock from '../../components/Clock'
export default function BlocksHolder(options) {
    useInterval(() => 1, 1000);
    const blocks = []
    const rows = 1
    const cols = 1
    const blockStyle = { width: (100 / cols) + 'vw', height: (100 / rows) + 'vh'}
    for (let i = 0; i < rows * cols; i++) {
        blocks.push(<Clock index={i} style={blockStyle} />)
    }
    return <div className="blocks-holder">
        {blocks.map(block => block)}
    </div>
}