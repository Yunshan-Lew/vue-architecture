import config from '@/config/config'
import cookies from 'js-cookie'
import { toQueryString } from '@/utils/toQueryString'
// import { redirect } from '@/utils/redirect'
import router from '@/router/router'
import axios from 'axios'

export const commonAction = {
  fetchCommon ({ dispatch, commit, state, rootState }, param, defaultParam = config.defaultParam) {
    const userToken = /*rootState.authority.userInfo.token ||*/ cookies.get('token')
		const { url, sign, data, onSuccess, onFail } = param
    
		const SUCCESS = config.status.success
		const FAIL = config.status.fail
		const EXPIRES = config.status.expires
		
    axios({
      method: 'post',
      baseURL: config.serviceHost,
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [function (postData, headers) {
        return toQueryString(postData)
      }],
      timeout: 60000,
      data: Object.assign({ "token": userToken }, defaultParam, data)
    })
		.then((res) => {
			if (res && res.status === 200) {
				let { code, data } = res.data
				if( SUCCESS.indexOf(code) > -1 ) {
					if( sign && typeof data !== 'undefined' ){
						commit('COMMON_SUCCESS', {
							sign,
							data: data
						})
					}
					if (typeof onSuccess === 'function') {
						onSuccess(res.data)
					}
				}
				else if ( FAIL.indexOf(code) < 0 && typeof onFail === 'function') {
					onFail(res.data)
				}
				else if( EXPIRES.indexOf(code) > -1 ){
					// redirect('/')
					cookies.set('logState', 'false', { 
						expires: 7 
					})
					router.push({ path: '/login' })
				}
			}
		})
		.catch((error) => {
			if (typeof onFail === 'function') {
				if (config.debug) {
					onFail({ msg: JSON.stringify(error) })
				}
				else {
					onFail({ msg: '服务器无响应' })
				}
			}
		})
  }
}
