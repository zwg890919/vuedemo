var state = {
    currentUser:{},
    currentGroup:{}
}

const getters = {

}
const actions = {
    selectUser({ commit, state }, userData) {
        commit('changeUser', userData)
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
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
