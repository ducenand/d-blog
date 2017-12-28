const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const moment = require('moment')
const marked = require('marked')
const mysql = require('mysql')

const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: '/servers/config'
})

const jsonWrite = function(res, result) {
  if (typeof result === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(result);
  }
}

const pool = mysql.createPool(config.mysql)
module.exports = {

  getArticle: function(req, res, next) {
    res.json({
      code: '5',
      msg: '操作失败'
    })
    // var id = req.params.id
    // jsonWrite(res, { code: 0, msg: 'ddd' })
    // pool.getConnection(function(error, connection) {
    //   connection.query('INSERT INTO post (uid,create_time,status,author) value (?,?,?,?)', [uid,create_time,author,5], function(error, results, fields) {

    //     if (!error) {
    //       res.render('writing', { data: { article_id: results.insertId } })
    //     } else {
    //       req.flash('error', 'sql错误，请联系管理员')
    //       res.redirect('back')
    //     }

    //     connection.release()

    //   })
    // })
  }

}
