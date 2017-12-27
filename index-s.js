var babel = require('babel-register')
const path = require('path')
const express = require('express')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const flash = require('connect-flash')
const pkg = require('./package')
const routes = require('./routes.js')

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
const app = express()

import webpack_config from './build/webpack.dev.conf'


const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: '/servers/config'
});


// 创建Redis客户端
const redisClient = redis.createClient(config.redis.port, config.redis.host)

// 设置Express的Session存储中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,//// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new RedisStore({client: redisClient})

}))

app.use(flash())


// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必需的三个变量
app.use(function (req, res, next) {

  // console.log(req.session)
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

//引入webpack中间件
const compiler = webpack(webpack_config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpack_config.output.publicPath,
  stats: { colors: true }
}))
app.use(webpackHotMiddleware(compiler))


// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`The server is running at http://localhost:${config.port}`)
})
