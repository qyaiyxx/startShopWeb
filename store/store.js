import Vue from 'vue'
import Vuex from 'vuex'
Vue.config.devtools = true
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		user_id:null,
		user:{}
	},
    mutations: {},
    actions: {}
})
export default store;
