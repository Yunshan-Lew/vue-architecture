export const commonMutation = {
	COMMON_SUCCESS (state, { sign, data }) {
    state[sign] = { ...state[sign] }
    state[sign] = data
  },
  COMMON_FAILURE (state, action) {
    state[sign] = { ...state[sign] }
  }
}
