import Vue from 'vue'
import Vuex from 'vuex'

import systemSetting from './modules/systemSetting'
import appMenu from './modules/appMenu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    systemSetting,
    appMenu
  }
})
