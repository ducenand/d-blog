const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()
const UserModel = require('../models/userModel')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/adduser', checkLogin, function(req, res, next) {
  res.render('adduser')
})



router.post('/adduser',checkLogin,function (req, res, next) {
   app.use(require('express-formidable')({
      uploadDir: path.join(__dirname, 'servers/admin/public/img'), // 上传文件目录
      keepExtensions: true// 保留后缀
    }))

  UserModel.adduser(req, res, next)
})


module.exports = router
