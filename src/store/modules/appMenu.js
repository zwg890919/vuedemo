

var state = {
  applist:[],
  currentApp:{}
}

const actions = {
  getMenu({ commit, state }, appState) {
    commit('getMenu', appState)
  },
  changeMenu({ commit, state }, currentApp) {
    commit('changeMenu', currentApp)
  }
}
const mutations = {
  getMenu(state, appState) {
    Object.assign(state, appState);
  },
  changeMenu(state, currentApp) {
    state.currentApp = currentApp
  }
}
export default {
  state,
  actions,
  mutations
}
