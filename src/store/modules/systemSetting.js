const state={
  'headerFixed':false,
  'Asidefixed':false,
  'container':false,
  'asideIndent':false
}

const actions={

}

const mutations={
  changeSetting(state,type){
    switch (type) {
      case 1:
        state.headerFixed = !state.headerFixed
        break;
      case 2:
        state.Asidefixed = !state.Asidefixed
        break;
      case 3:
        state.asideIndent = !state.asideIndent
        break;
      case 4:
        state.container = !state.container
        break;
      default:
        break;
    }
  }
}
export default {
  state,
  // getters,
  actions,
  mutations
}
