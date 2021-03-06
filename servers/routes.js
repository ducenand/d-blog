const express = require('express')
// var bodyParser = require('body-parser')
const path = require('path')

module.exports = function(app) {
  /* index router */
  app.use(express.static(path.join(__dirname, './')))
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })


  /* api router */
  app.use('/api', require('./api/routes'))


  /* -----------admin router----------- */
  // 设置模板目录
  app.set('views', path.join(__dirname, './admin/views'))
  // 设置模板引擎为 ejs
  app.set('view engine', 'ejs')
  app.use(express.static(path.join(__dirname, './admin/public')))
    // 获取参数 处理表单及文件上传的中间件
  app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, './admin/public/img'), // 上传文件目录
    keepExtensions: true// 保留后缀
  }))
  //中间件 获取参数
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());

  app.use('/admin', require('./admin/routes'))
  /** -----------admin router end----------- */



  app.use(function(req, res) {
    if (!res.headersSent) {
      res.sendFile(__dirname + '/404.html')
    }
  })

}
