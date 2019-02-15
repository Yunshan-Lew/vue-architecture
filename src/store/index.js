import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { common } from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    common
  },
  plugins: debug ? [createLogger()] : [],
  strict: process.env.NODE !== 'production'
})

if (module.hot) {
  module.hot.accept(['./modules'], function () {
    const newModules = require('./modules').default
    store.hotUpdate({
      modules: newModules
    })
  })
}

export default store
