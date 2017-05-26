import axios from 'axios'
import api from '@/api'

var state = {
    applist: [],
    currentApp: {}
}

const actions = {
    getMenu({ commit, state }) {
        axios({
            method: 'get',
            url: api.config.api + api.config.getMenu,
            timeout: api.config.timeout,
            headers: api.config.headers,
        }).then(function (response) {
            if (response.status == 200) {
                let applist = [];
                response.data.datas.result.childrens.forEach(function (node, index) {
                    if (node.id > 10019) {
                        applist.push(node)
                    }
                }, this);
                const currentApp = applist[0]
                let Newstate= {}
                if(state.currentApp.id){
                     Newstate = { applist }
                }else{
                     Newstate = { applist, currentApp }
                }
                commit('getMenu',Newstate)
            } else {
                return false;
            }
        });
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
