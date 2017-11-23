const express = require('express')
const path = require('path')

module.exports = function (app) {

  app.use(express.static(path.join(__dirname, './')))
  app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
  })
  app.use('/api', require('./servers/api/routes/api'))

  // 设置模板目录
  app.set('views', path.join(__dirname, './servers/admin/views'))
  // 设置模板引擎为 ejs
  app.set('view engine', 'ejs')
  app.use(express.static(path.join(__dirname, './servers/adminpublic')))
  app.use('/admin', require('./servers/admin/routes'))
  app.use(function (req, res) {
    if (!res.headersSent) {
      // res.status(404).render('404')
      res.sendFile(__dirname+'/404.html');
    }
  })

}
