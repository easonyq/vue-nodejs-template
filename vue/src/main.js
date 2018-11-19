/**
 * @file vue 主入口
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
