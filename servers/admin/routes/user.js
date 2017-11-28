const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/adduser',checkLogin,function (req, res, next) {
  res.render('adduser')
})

// router.post('/signin',checkLogin,function (req, res, next) {
//   UserModel.signin(req, res, next)
// })


module.exports = router
