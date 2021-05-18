import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import page from './modules/page'
import db from './modules/db'
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
        page,
        db
    },
    getters
})
export default store