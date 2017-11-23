// const fs = require('fs')
// const path = require('path')
// const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

// const UserModel = require('../models/users')
// const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/signup', function (req, res, next) {
  res.send('signup')
})



module.exports = router
