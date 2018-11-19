/**
 * @file store 主入口
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import Vue from 'vue'
import Vuex from 'vuex'

import example from './modules/example'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    example
  },
  strict: process.env.NODE_ENV !== 'production'
})
