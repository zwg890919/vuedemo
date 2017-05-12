import {convertTreedata} from  "@/assets/js/common.js"

var state = {
    currentUser:{},
    currentGroup:{},
    menuData:[],
    itempackList:[],
    checkDisable:true
}

const getters = {
    menuList (state, getters, rootState) {
        if(state.currentGroup.pckMenuId){
            const currentItempck = state.currentGroup.pckMenuId.split(",")
            return convertTreedata(state.menuData,state.checkDisable,currentItempck)
        }else{
            return convertTreedata(state.menuData,state.checkDisable)
        }
    }
}
const actions = {
    selectUser({ commit, state }, userData) {
        commit('changeUser', userData)
        state.itempackList.map(item =>{
            if(item.pckId == userData.userRole){
                commit('changeGroup', item)
            }
        })
    },
    selectGroup({ commit, state }, groupData) {
        commit('changeGroup', groupData)
    },
}

const mutations = {
    changeUser(state, userData) {
        state.currentUser = userData
    },
    changeGroup(state, groupData) {
        state.currentGroup = groupData
    },
    updataGroup(state, updata){
        Object.assign(state.currentGroup, updata);
    },
    setMenuData(state, menuData) {
        state.menuData = menuData
    },
    setItempackList(state, itemlist) {
        state.itempackList = itemlist
    },
    modifiyMenu(state, checkState){
        state.checkDisable = checkState
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
