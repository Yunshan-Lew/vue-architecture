import cookies from 'js-cookie'

export const commonMutation = {
	COMMON_SUCCESS (state, action) {
    state[action.sign] = { ...state[action.sign] }
    state[action.sign] = action.data.data || action.data.info
  },
  COMMON_FAILURE (state, action) {
    state[action.sign] = { ...state[action.sign] }
  },
	COMMON_EXPIRES (state, action) {
		cookies.set('logState', 'false', { 
			expires: 7 
		})
		state[action.sign] = { ...state[action.sign] }
	}
}
