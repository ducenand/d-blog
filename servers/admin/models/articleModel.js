const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const moment = require('moment')
const mysql = require('mysql')

const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: '/servers/config'
})




var jsonWrite = function(res, result) {
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

  writing: function(req, res, next) {
    const title = req.fields.title
    const markdown_content  = req.fields.content
    const uid = req.session.user.id
    var create_time = moment().format('YYYY-MM-DD HH:mm:ss')

    pool.getConnection(function(error, connection) {

      connection.query('INSERT INTO post (uid,title,markdown_content,create_time) values(?,?,?,?)', [uid,title,markdown_content,create_time], function(error, results, fields) {
        if (!error) {
          req.flash('success', '发布成功')
          res.redirect('back')
        } else {
          fs.unlink(req.files.file.path)
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release();


      })

    })

  },
  preview: function(req, res, next) {
    res.send('preview')
  }


}
