import Vue from 'vue'
import Vuex from 'vuex'

import systemSetting from './modules/systemSetting'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    systemSetting
  }
})
