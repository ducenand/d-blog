const express = require('express')
const router = express.Router()
const article = require('../models/articleModel')
// const checkLogin = require('../middlewares/check').checkLogin

//获取文章
router.get('/getArticle', function(req, res, next) {
  article.getArticle(req, res, next)
})



module.exports = router
