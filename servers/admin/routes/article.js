const express = require('express')
const router = express.Router()
const article = require('../models/articleModel')
const checkLogin = require('../middlewares/check').checkLogin

//写文章
router.get('/writing', checkLogin, function(req, res, next) {
  article.writingGet(req, res, next)
})

router.post('/writing', checkLogin, function(req, res, next) {
  article.writingPost(req, res, next)
})

//预览文章
router.get('/preview/:id', checkLogin, function(req, res, next) {
  article.preview(req, res, next)
})

//更新草稿
router.post('/updataArticle', checkLogin, function(req, res, next) {
  article.updataArticle(req, res, next)
})

//文章编辑
router.get('/edit/:id', checkLogin, function(req, res, next) {
  article.editArticle(req, res, next)
})

router.post('/edit', checkLogin, function(req, res, next) {
  article.editArticlePost(req, res, next)
})

//所有文章列表
router.get('/allArticle', checkLogin, function(req, res, next) {
  article.allArticle(req, res, next)
})



module.exports = router
