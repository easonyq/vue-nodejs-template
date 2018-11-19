/**
 * @file 示例 vuex 模块
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import {get} from '../../utils/request'

const state = {
  message: 'Not meant to be displayed'
}

const getters = {}

const mutations = {
  setMessage (state, message) {
    state.message = message
  }
}

const actions = {
  initMessage ({commit}) {
    commit('setMessage', 'Initial Message')
  },

  async getNewMessage ({commit}) {
    let result = await get('/api/example', {
      params: {
        a: 1,
        b: 2
      }
    })
    commit('setMessage', result.message)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
