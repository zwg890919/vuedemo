var state = {
    'headerFixed': false,
    'Asidefixed': false,
    'container': false,
    'asideIndent': false,
    'themeID': "1",
}


if (localStorage.getItem("settings")) {
    state = JSON.parse(localStorage.getItem("settings"))
} else {
    localStorage.setItem("settings", JSON.stringify(state))
}


const actions = {

}

const mutations = {
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
