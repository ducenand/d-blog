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
    res.json({
      code:0,
      msg:'sussess',
      data: result
    });
  }
}

const pool = mysql.createPool(config.mysql)

module.exports = {
  getArticleList: function(req, res, next) {

    pool.getConnection(function(error, connection) {
      connection.query('SELECT * FROM post WHERE status=3 ORDER BY create_time DESC',function(error, results, fields) {
        if (!error) {
          jsonWrite(res,results)
        } else {
          jsonWrite()
        }
        connection.release()
      })

    })
  },
  getArticle: function(req, res, next) {
    var id = req.query.id
    pool.getConnection(function(error, connection) {
      connection.query('SELECT * FROM post WHERE id = ?', [ id], function(error, results, fields) {
        if (!error) {
          jsonWrite(res,results[0])
        } else {
          jsonWrite()
        }

        connection.release()
      })

    })
  }

}
