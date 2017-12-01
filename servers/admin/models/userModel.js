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

  signin: function(req, res, next) {
    pool.getConnection(function(error, connection) {
      let email = req.fields.email
      let password = req.fields.password
      connection.query('SELECT * FROM user WHERE email = ?', [email], function(error, results, fields) {

        if (!error) {
          if (results[0] && sha1(password) === results[0].password) {
            req.flash('success', '登录成功')
            delete results[0].password
            req.session.user = results[0]
            res.redirect('/admin')
          } else {
            req.flash('error', '用户名或密码错误')
            res.redirect('back')
          }

        } else {
          req.flash('error', 'sql错误，请联系管理员')
          jsonWrite(res, error);
        }

        connection.release();
        // if (error) throw error;

      })

    })

  },
  adduser: function(req, res, next) {

    const username = req.fields.username
    const email = req.fields.email
    const type = req.fields.type
    const profile = req.fields.profile

    const head_url = req.files.file.path.split(path.sep).pop()
    let password = req.fields.password
    const create_time = moment().format('YYYY-MM-DD HH:mm:ss')

    // 校验参数
    try {
      if (!(username.length >= 1 && username.length <= 10)) {
        throw new Error('名字请限制在 1-10 个字符')
      }

      if (!(profile.length >= 1 && profile.length <= 30)) {
        throw new Error('个人简介请限制在 1-30 个字符')
      }
      if (!req.files.file.name) {
        throw new Error('缺少头像')
      }
      if (password.length < 6) {
        throw new Error('密码至少 6 个字符')
      }

    } catch (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.file.path)
      req.flash('error', e.message)
      return res.redirect('back')
    }
    password = sha1(password)

    this.findUser(email, function(data, connection) {
      if (data[0]) {
        fs.unlink(req.files.file.path)
        req.flash('error', 'email已被注册过')
        res.redirect('back')
      } else {

        connection.query('INSERT INTO user (username, email, type, profile, head_url, password,create_time) values(?,?,?,?,?,?,?)', [username, email, type, profile, head_url, password,create_time], function(error, results, fields) {

          if (!error) {
            req.flash('success', '添加用户成功')
            res.redirect('back')
          } else {
            fs.unlink(req.files.file.path)
            req.flash('error', 'sql错误，请联系管理员')
            res.redirect('back')
          }

          connection.release();
          if (error) throw error;

        })

      }



    })


  },
  findUser: function(email, callback) {


    pool.getConnection(function(error, connection) {

      connection.query('SELECT * FROM user WHERE email = ?', [email], function(error, results, fields) {
        console.log(results)
        if (!error) {
          typeof callback == 'function' && callback(results, connection)
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }
      })

    })

  }


}
