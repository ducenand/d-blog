const express = require('express')
const router = express.Router()
const article = require('../models/articleModel')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/writing', checkLogin, function(req, res, next) {
  res.render('writing')
})

router.post('/writing', checkLogin, function(req, res, next) {
  article.writing(req, res, next)
})


router.get('/preview', checkLogin, function(req, res, next) {

  article.preview(req, res, next)
})



module.exports = router
