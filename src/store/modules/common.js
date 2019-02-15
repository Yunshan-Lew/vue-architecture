import { commonAction } from '../actions/common'
import { commonMutation } from '../mutations/common'

export const common = {
  state: {
    'system/cararea': {
      data: []
    },
    'system/carcity': {
      data: []
    },
    'system/carbrand': {
      data: ['Benz','BMW','Audi']
    },
		'loginInfo': {
			
		}
  },
  mutations: commonMutation,
  actions: commonAction
}
