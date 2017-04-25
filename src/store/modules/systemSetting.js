const data={
  'headerFixed':false,
  'Asidefixed':false,
  'Asidefolded':false,
  'Asidedock':false,
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
        state.Asidefolded = !state.Asidefolded
        break;
      case 4:
        state.Asidedock = !state.Asidedock
        break;
      case 5:
        state.container = !state.container
        break;
      case 6:
        state.asideIndent = !state.asideIndent
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
