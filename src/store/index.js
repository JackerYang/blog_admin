import Vue from 'vue'
import Vuex from 'vuex'

import app from "./modules/app"
import table from "./modules/table"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        table
    }
})
