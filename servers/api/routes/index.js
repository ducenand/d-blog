const express = require('express')
const router = express.Router()


/* 文章相关路由 */
var article = require('./article')
router.use(article)


module.exports = router;
