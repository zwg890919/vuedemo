import axios from 'axios'
import api from '@/api'
import {eachAllChild} from '@/assets/js/common'
var state = {
    applist: [],
    currentApp: {},
    codeList:[]
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

                var codeList = []

                eachAllChild({
                    childrens : Newstate.applist
                },(item) => {
                    if(item.menuCode)
                    codeList.push(item.menuCode)
                })
                commit('getCode',codeList)
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
    },
    getCode(state,codeList){
        state.codeList = codeList
    }
}
export default {
    state,
    actions,
    mutations
}
