const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/signin',checkNotLogin,function (req, res, next) {
  res.render('signin')
})

router.post('/signin',checkNotLogin,function (req, res, next) {
  UserModel.signin(req, res, next)
})


module.exports = router
