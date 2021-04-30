import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import page from './modules/page'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
    },
    mutations:{
        
    },
    actions:{},
    modules:{
        user,
        page
    },
    getters
})
export default store