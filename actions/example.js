/**
 * @file 测试路由
 * @author wangyisheng@baidu.com (wangyisheng)
 */

module.exports = {
  // 根据目录结构自动生成路由，如 actions/example.js => /api/example
  // 如果有特定需求，使用 routerPath 配置项进行重写
  // routerPath: '/custom/example',

  async handler (ctx, next) {
    // 获取 querystring
    // /api/example?a=1&b=2 => {a:1, b:2}
    let query = ctx.query

    // 获取路由动态参数
    // /api/example 配上 routerPath = '/api/:name' 的话 => {name: example}
    // let params = ctx.params

    ctx.body = {
      message: 'Greeting from node action',
      query
    }
  }
}
