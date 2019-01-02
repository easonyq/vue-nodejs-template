/**
 * @file 生产环境主入口
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const Koa = require('koa')
const Router = require('koa-router')
const glob = require('glob')
const koaStatic = require('koa-static')
const history = require('koa2-history-api-fallback')

const {PORT} = require('./config/server')
const {getRouterPath, log} = require('./utils/framework')

const app = new Koa()
const router = new Router()

process.env.NODE_ENV = 'production'

registerApp()

async function registerApp () {
  app.use(async (ctx, next) => {
    log.info(ctx.url)
    await next()
  })

  try {
    // node 端中间件和路由
    await registerMiddlewares();
    await registerRoutes();
    app.use(router.routes());
    app.use(router.allowedMethods());

    // 前端(vue)路由
    // 所有 navigate 请求重定向到 '/index.html'，配合底下的 koaStatic，实际位置位于 vue-dist/index.html
    app.use(history({
        htmlAcceptHeaders: ['text/html'],
        index: '/index.html'
    }));
    app.use(koaStatic('vue-dist'));
    app.use(koaStatic('public'));

    app.listen(PORT);

    log.info('生产环境服务器启动于端口号', PORT);
  } catch (e) {
    log.error(e)
    log.error('生产环境服务器启动失败\n\n')
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
