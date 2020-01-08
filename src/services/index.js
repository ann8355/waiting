import xhr from './utils/xhr'
import api from './utils/api'

export default {
  getWaitingNum (code) {
    const request = xhr.request({
      method: 'get',
      url: `${api.local}/api/waitings/${code}`
    })
    return request
  },
  getWaitingInfo (code) {
    const request = xhr.request({
      method: 'get',
      url: `${api.local}/api/waits/${code}`
    })
    return request
  }
}
