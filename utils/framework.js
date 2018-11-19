/**
 * @file 框架本身使用的 utils 方法，和业务逻辑分开
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const chalk = require('chalk')
const log = console.log

module.exports = {
  /**
   * 把 actions 路径转化为自动路由
   *
   * @param {string} actionPath 'action/example.js'
   * @returns {string} '/api/example'
   */
  getRouterPath (actionPath) {
    let paths = actionPath.split('/')
    paths[0] = 'api'
    paths[paths.length - 1] = paths[paths.length - 1].replace(/\.js$/i, '')
    return `/${paths.join('/')}`
  },

  // 带颜色的日志打印
  log: {
    info () {
      log(chalk.green('[Info]'), ...arguments)
    },

    warn () {
      log(chalk.yellow('[Warn]'), ...arguments)
    },

    error () {
      log(chalk.red('[Error]'), ...arguments)
    }
  }
}
