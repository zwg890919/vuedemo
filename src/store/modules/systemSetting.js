let state = {
    'headerFixed': false,
    'Asidefixed': false,
    'container': false,
    'asideIndent': false,
    'themeID': "1",
    'asideUserShow': false,
     'hisRoute':[]
}



if (localStorage.getItem("settings")) {
    
    state = JSON.parse(localStorage.getItem("settings"))
} else {
    localStorage.setItem("settings", JSON.stringify(state))
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
    },
    changeMenuArr(state, from) {
        var name = from.name.split('.')[2] ? from.name.split('.')[2] : from.name.split('.')[1];
        let toggle = true;
        for(let x of state.hisRoute){
            if(x.name == name) {
                toggle = false
            }
        }
        if(toggle){
            state.hisRoute.push({
                name:name,
                route:from.path
            });
            localStorage.setItem("settings", JSON.stringify(state))
        }
        
    },
    menuArrShift(state) {
        state.hisRoute.shift();
        localStorage.setItem("settings", JSON.stringify(state))
    }
}
export default {
    state,
    // getters,
    actions,
    mutations
}
