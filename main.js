import Vue from 'vue'
import App from './App'
import uView from './uview-ui'
import request from './request/request.js'
import store from './store/store.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.http=request
Vue.prototype.store=store
// 引入全局uView
Vue.use(uView);
const app = new Vue({
    ...App
})
app.$mount()
