const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin


// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route
router.get('/',checkLogin,function(req, res) {
  res.send('后台主页')
})


var signup = require('./signup.js')
router.use(signup)
var signin = require('./signin.js')
router.use(signin)


module.exports = router;
