const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/adduser', checkLogin, function(req, res, next) {
  res.render('adduser')
})


router.post('/adduser',checkLogin,function (req, res, next) {
  UserModel.adduser(req, res, next)
})


module.exports = router
