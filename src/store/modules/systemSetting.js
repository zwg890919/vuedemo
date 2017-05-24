let state = {
    'headerFixed': false,
    'Asidefixed': false,
    'container': false,
    'asideIndent': false,
    'themeID': "1",
    'asideUserShow': false
}


console.log(localStorage.getItem("settings"))
if (localStorage.getItem("settings")) {
    console.log(213213)
    state = JSON.parse(localStorage.getItem("settings"))
} else {
    console.log(789)
    // localStorage.setItem("settings", JSON.stringify(state))
}


const actions = {
    showUser({ commit, state }) {
        commit('changeUserShow');
    }
}

const mutations = {
    changeUserShow(state) {
        state.asideUserShow = !state.asideUserShow;
    },
    changeSetting(state, type) {
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
        localStorage.setItem("settings", JSON.stringify(state))
    }
}
export default {
    state,
    // getters,
    actions,
    mutations
}
