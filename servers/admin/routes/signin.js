const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const middlewares = require('../middlewares/check')
const checkNotLogin = middlewares.checkNotLogin
const checkLogin = middlewares.checkLogin

router.get('/signin', checkNotLogin, function(req, res, next) {
  res.render('signin')
})

router.post('/signin', checkNotLogin, function(req, res, next) {
  UserModel.signin(req, res, next)
})


router.get('/loginout', checkLogin, function(req, res, next) {
  req.session.user = null
  req.flash('success', '登出成功')
  // 登出成功后跳转到主页
  res.redirect('/admin/signin')
})


module.exports = router
