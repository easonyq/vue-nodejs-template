/**
 * @file 测试中间件
 * @author wangyisheng@baidu.com (wangyisheng)
 */

module.exports = async (ctx, next) => {
  // 信息获取方式和 actions 一样，通过 ctx
  // console.log('This is example middleware', ctx.url, ctx.query)

  // 如果要继续走路由组件的，不要忘记调用 await next()
  await next()

  // 如果不走路由组件了，那就直接 ctx.body = xxx
  // ctx.body = 'Intercept by middleware'
}
