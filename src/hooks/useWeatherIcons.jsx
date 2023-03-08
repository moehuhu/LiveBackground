import _ from 'lodash'
import useWeather from "./useWeather"
import useDayNightPercent from "./useDayNightPercent"
const svgList = _.keys(import.meta.globEager('../assets/svgs/weather/*.svg')).map(svg => new URL(svg, import.meta.url))
const getFilename = url => _.chain(url).get('pathname').thru(str => str.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/g)).last()
const getWeatherCategory = url => getFilename(url).thru(str => str.match(/^[a-zA-Z]+/g)).first()
const getWeatherLevel = url => getFilename(url).thru(str => str.match(/[0-9]+/g)).last().toNumber()

const useWeatherIcon = (props) => {
    const weather = useWeather()?.result?.realtime
    const sorter = list => _(list).sortBy(getWeatherLevel).value()
    const weatherGroup = _(svgList).groupBy(getWeatherCategory).mapValues(sorter).value()

    const { day, night } = useDayNightPercent(props)
    const sunmoon = [...(day ? weatherGroup['sun'] : []), ...(night ? weatherGroup['lune'] : []),]
    const multIcons = (icons, mult = 1) => _.times(mult, i => icons).flat()
    const dayNight = (icons, mult = 1) => [...sunmoon, ...multIcons(icons, mult)]
    const cloud = weatherGroup['cloud']
    const cloudy = () => multIcons(cloud, _.toInteger(weather?.cloudrate * 10))
    const haze = weatherGroup['haze']
    const rain = weatherGroup['rain']
    const fog = weatherGroup['fog']
    const snow = weatherGroup['snow']
    const snowflake = weatherGroup['snowflake']
    const dust = weatherGroup['dust']
    const sand = weatherGroup['sand']
    const wind = weatherGroup['wind']
    const windy = () => multIcons(wind, _.toInteger(weather?.wind?.speed) || 1)
    const getIconList = () => {
        const icons = {
            'CLEAR_DAY': dayNight(cloudy()),
            'CLEAR_NIGHT': dayNight(cloudy()),
            'PARTLY_CLOUDY_DAY': dayNight(cloudy()),
            'PARTLY_CLOUDY_NIGHT': dayNight(cloudy()),
            'CLOUDY': cloudy(),
            'LIGHT_HAZE': [...dayNight(haze), ...multIcons(sunmoon, 4), ...cloudy()],
            'MODERATE_HAZE': dayNight(haze, 5),
            'HEAVY_HAZE': haze,
            'LIGHT_RAIN': _.take(rain),
            'MODERATE_RAIN': _.take(rain, 2),
            'HEAVY_RAIN': _.takeRight(rain, 2),
            'STORM_RAIN': _.takeRight(rain),
            'FOG': fog,
            'LIGHT_SNOW': [...cloud, ...snow],
            'MODERATE_SNOW': [...cloud, ...snow, ...snowflake],
            'HEAVY_SNOW': [...snow, ...snowflake],
            'STORM_SNOW': snowflake,
            'DUST': [...cloudy(), ...dust],
            'SAND': [...cloudy(), ...sand],
            'WIND': [...cloudy(), ...windy()],
        }
        return weather?.skycon ? icons[weather.skycon] : cloudy()
    }
    const list = (getIconList() || [])?.map(svg => svg.href)
    return list
}

export default useWeatherIcon