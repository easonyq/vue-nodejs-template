# What?

这是一个 后端采用 nodejs，前端采用 Vue 的全栈项目。

Vue 部分集成了 Vue + Vue Router + Vuex 三个套件，并且使用 webpack 4.x 进行编译。webpack 中还包括了例如 babel, webpack-dev-server 等等常规功能。支持 less。

nodejs 部分包含 actions （自动生成路由&允许手动配置），middlewares 两种机制。

最后使用 webpack-dev-middleware 把两者合并，只要启动一个服务器，就能把两者都启动起来，前后端可以正常通讯。

可以把这个项目当做初始模板启动新的 nodejs + Vue 项目。

如果想单独使用 Vue 部分，查看 [vue-template](https://github.com/easonyq/vue-template)。

# Why?

vue-cli 有创建初始 Vue 项目模板的功能，但它存在几个很大的问题：

1. vue-cli 2.x 版本创建的项目依赖 webpack 3.x，以及所有的 webpack 的依赖项（例如 babel）都比较老，而 webpack 4.x 有了极大的性能提升和大量的配置简化，不应该停留在老版本中。

2. vue-cli 3.x 与时俱进，依赖 webpack 4.x，配套的依赖项也都很新。但问题是它是一个封闭的状态，所有内容只能通过预设的配置项来更改，而不是代码的形式。比如我想从 webpack-dev-server 改用 webpack-dev-middleware，我就不知道从哪儿开始。

所以在目前这个尴尬的状态下，我需要一个项目当做模板来启动其他项目。

而且要把 Vue 和 nodejs 合并起来，不能使用默认的 webpack-dev-server，因此需要使用 webpack-dev-middleware 配合 koa 使用，配置上也稍微麻烦，这个项目留作备用。

# How?

目前内置了两条最基本的命令：

* `npm run dev` - 启动开发服务器，端口 8000 （可以在配置中修改）

* `npm run build` - 进行构建，把 Vue 部分生成到 `/vue-dist`

* `npm run start` - 用生产模式启动构建后的项目
