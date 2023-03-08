import _ from 'lodash'
import moment from 'moment'
import SunCalc from 'suncalc'
const useSun = (props) => {
    const position = props?.position || '120.1513,30.2581' //断桥残雪
    const [longi, lati] = _.split(position, ',')
    const [longitude, latitude] = [_.toNumber(longi), _.toNumber(lati)]
    const times = SunCalc.getTimes(new Date(), latitude, longitude)
    return _.mapValues(times, item => moment(item))
}
export default useSun