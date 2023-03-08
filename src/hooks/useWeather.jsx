import { useState } from "react"
import { useInterval } from 'ahooks'
import _ from 'lodash'

const useWeather = (props) => {
  const [weather, setWeather] = useState({})
  const position = props?.position || '120.1513,30.2581' //断桥残雪
  const weatherAPI = `/weather/${position}/realtime`
  const fetchWeather = () => fetch(weatherAPI).then(response => response.json())
  const getWeather = _.debounce(() => fetchWeather().then(setWeather))
  useInterval(getWeather, 300000, { immediate: true })
  return weather
}

export default useWeather