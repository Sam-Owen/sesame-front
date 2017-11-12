import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    stockList: []
}

// 定义所需的 mutations
const mutations = {
    GET_STOCK_LIST(state, data) {
        state.stockList = data
    },
    GET_STOCK_DATA(state, data) {
        state.stockData = data
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})