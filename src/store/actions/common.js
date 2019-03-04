import config from '@/config/config'
import cookies from 'js-cookie'
import { toQueryString } from '@/utils/toQueryString'
import { redirect } from '@/utils/redirect'
import axios from 'axios'

export const commonAction = {
  fetchCommon ({ dispatch, commit, state, rootState }, param, defaultParam = config.defaultParam) {
    const userToken = /*rootState.authority.userInfo.token ||*/ cookies.get('token')
		const { url, sign, data, onSuccess, onFail, router } = param
    
		const SUCCESS = config.status.success
		const FAIL = config.status.fail
		const EXPIRES = config.status.expires
		
    axios({
      method: 'post',
      baseURL: config.serviceHost,
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [function (data, headers) {
        return toQueryString(data)
      }],
      timeout: 60000,
      data: Object.assign({ "token": userToken }, defaultParam, data)
    })
		.then((res) => {
			if (res && res.status === 200) {
				if( res.data.code.indexOf(SUCCESS) > -1 ) {
					commit('COMMON_SUCCESS', {
						sign,
						data: res.data
					})
					if (typeof onSuccess === 'function') {
						onSuccess(res.data)
					}
				}
				else if ( res.data.code.indexOf(FAIL) < 0 ) {
					commit('COMMON_FAILURE', {
						sign,
						data: res.data
					})
					if (typeof onFail === 'function') {
						onFail(res.data)
					}
				}
				else if( res.data.code.indexOf(EXPIRES) > -1 ){
					 redirect('/')
				}
			}
		})
		.catch((error) => {
			commit('COMMON_FAILURE', {
				sign,
				data: error
			})
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
