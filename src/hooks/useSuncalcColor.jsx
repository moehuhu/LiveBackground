import { colord, extend } from "colord"
import mixPlugin from "colord/plugins/mix"
extend([mixPlugin])
import useDayNightPercent from "./useDayNightPercent"

const useSuncalcColor = (props) => {
    const dayColor = "#8abff4"
    const nightColor = "#461d6b"
    const percents = useDayNightPercent(props)
    return colord(dayColor).mix(nightColor, percents.night).toHex()
}

export default useSuncalcColor