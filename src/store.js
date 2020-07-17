import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        title: '云上逛大学',
        ifLogined:false,
        ifHideTitle:false,
        host:'http://112.74.164.4:8090'
    },
    mutations:{
        changeTitle(state,title){
            state.title = title
        },
        changeIfLogined( state, ifLogin ){
            state.ifLogined = ifLogin
        },
        changeIfHideTitle( state, ifHide ){
            state.ifHideTitle = ifHide
        }
    },
    getters:{
        getState(state){
            return state.title
        },
        getIfLogined(state){
            return state.ifLogined
        },
        getHost(state){
            return state.host
        },
        getIfHideTitle( state ){
            return state.ifHideTitle
        }
    },
})