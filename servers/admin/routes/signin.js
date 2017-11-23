const express = require('express')
const router = express.Router()

router.get('/signin',function (req, res, next) {
  res.render('signin')
})

router.post('/signin',function (req, res, next) {
  res.send('signin')
})



module.exports = router
