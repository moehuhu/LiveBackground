import useSun from "./useSun"
import moment from "moment"
import _ from "lodash"

const useDayNightPercent = (props) => {
    const times = useSun(props)
    const { nightEnd, sunriseEnd, sunsetStart, dusk } = times
    const now = moment()
    const isSunrising = (now.isBetween(nightEnd, sunriseEnd, '[]') && 1) || 0
    const isDaytime = (now.isBetween(sunriseEnd, sunsetStart, '()') && 2) || 0
    const isSunsetting = (now.isBetween(sunsetStart, dusk, '[]') && 3) || 0
    const isNight = (!(isSunrising || isDaytime || isSunsetting) && 4) || 0
    const progress = isSunrising + isDaytime + isSunsetting + isNight

    const sunrisePercent = now.diff(nightEnd) / sunriseEnd.diff(nightEnd)
    const sunsetPercent = now.diff(sunsetStart) / dusk.diff(sunsetStart)
    return [
        { day: 1, night: 0 },
        { day: sunrisePercent, night: 1 - sunsetPercent },
        { day: 1, night: 0 },
        { day: 1 - sunsetPercent, night: sunsetPercent },
        { day: 0, night: 1 }
    ][progress]
}
export default useDayNightPercent