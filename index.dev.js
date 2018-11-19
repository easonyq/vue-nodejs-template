/**
 * @file 开发环境主入口
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const Koa = require('koa')
const Router = require('koa-router')
const glob = require('glob')
const koaWebpack = require('koa-webpack')
const static = require('koa-static')
const history = require('koa2-history-api-fallback')

const {PORT} = require('./config/server')
const {getRouterPath, log} = require('./utils/framework')
const webpackConfig = require('./vue/webpack.config.js')

const app = new Koa()
const router = new Router()

process.env.NODE_ENV = 'development'

registerApp()

async function registerApp () {
  app.use(async (ctx, next) => {
    log.info(ctx.url)
    await next()
  })

  try {
    // 所有 navigate 请求重定向到 '/'
    // 因为 webpack-dev-server 只服务这个路由，否则就会漏到 node 端了。
    app.use(history({
      htmlAcceptHeaders: ['text/html'],
      index: '/'
    }))
    app.use(static('public'))
    await registerWebpack()
    await registerMiddlewares()
    await registerRoutes()
    app.use(router.routes())
      .use(router.allowedMethods())
      .listen(PORT)

    log.info('开发环境服务器启动于端口号', PORT, '等待 webpack 编译中，请稍候。\n\n')
  } catch (e) {
    log.error(e)
    log.error('开发环境服务器启动失败\n\n')
  }
}

async function registerRoutes () {
  return new Promise((resolve, reject) => {
    glob('actions/**/*.js', (err, files) => {
      if (err) {
        log.error('读取 actions 失败')
        log.error(err)
        reject()
        return
      }

      files.forEach(actionPath => {
        let action = require(`./${actionPath}`)
        if (typeof action.handler !== 'function') {
          log.warn(actionPath, '不是一个合法的 action，已经跳过')
          return
        }
        if (!action.routerPath) {
          action.routerPath = getRouterPath(actionPath)
        }
        router.get(action.routerPath, action.handler)
      })

      resolve()
    })
  })
}

async function registerMiddlewares () {
  return new Promise((resolve, reject) => {
    glob('middlewares/**/*.js', (err, files) => {
      if (err) {
        log.error('读取 middlewares 失败')
        log.error(err)
        reject()
        return
      }

      files.forEach(middlewarePath => {
        let middleware = require(`./${middlewarePath}`)
        if (typeof middleware !== 'function') {
          return
        }

        router.use(middleware)
      })

      resolve()
    })
  })
}

async function registerWebpack() {
  return new Promise(resolve => {
    koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        stats: 'minimal'
      }
    }).then(middleware => {
      app.use(middleware)
      resolve()
    })
  })
}
