const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

router.get('/',checkLogin,function(req, res) {
  res.render('index')
})

router.get('/content',checkLogin,function(req, res) {
  res.render('content')
})

//用户相关路由
var user = require('./user.js')
router.use(user)

//登录、登出相关相关接口
var signin = require('./signin.js')
var signup = require('./signup.js')
router.use(signup,signin)

module.exports = router;
