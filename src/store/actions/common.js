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
				let { code } = res.data
				if( SUCCESS.indexOf(code) > -1 ) {
					if( sign ){
						commit('COMMON_SUCCESS', {
							sign,
							data: res.data
						})
					}
					console.log('success')
					if (typeof onSuccess === 'function') {
						onSuccess(res.data)
					}
				}
				else if ( FAIL.indexOf(code) < 0 ) {
					if( sign ){
						commit('COMMON_FAILURE', {
							sign,
							data: res.data
						})
					}
					console.log('fail')
					if (typeof onFail === 'function') {
						onFail(res.data)
					}
				}
				else if( EXPIRES.indexOf(code) > -1 ){
					// redirect('/')
					if( sign ){
						commit('COMMON_EXPIRES', {
							sign,
							data: res.data
						})
					}
					console.log('expires')
					router.push({ path: '/login' })
				}
			}
		})
		.catch((error) => {
			if( sign ){
				commit('COMMON_FAILURE', {
					sign,
					data: error
				})
			}
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
