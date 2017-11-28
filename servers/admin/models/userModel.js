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
    // jsonWrite(res);
    pool.getConnection(function(err, connection) {

      let username = req.body.username
      let password = req.body.password

      connection.query('SELECT username,password FROM user WHERE username = ?',[username], function(error, results, fields) {

        if(!error) {
          if(results[0] && password === results[0].password) {
            req.flash('success', '登录成功')
            delete results[0].password
            req.session.user = results[0]
            res.redirect('/admin')
          }else{
            req.flash('error','用户名或密码错误')
            res.redirect('back')
          }

        }else{
          req.flash('error','sql错误，请联系管理员')
        }
        // console.log(error,results,fields)
        // res.send(results)
        connection.release();
        if (error) throw error;

      });





      // console.log(param)
      // jsonWrite(res, param)
      // let articleAuthor = req.session.islogin.userName;
      // let articleContent = markdown.toHTML(param.articleText);
      // let articleLink = "localhost:3000/blog/details/" + param.articleId;
      // 建立连接，向表中插入值
      // insertSql: 'insert into articles(articleTitle, articleDate, articleTag, articleAuthor ,articleLink, articleText) values(?,?,?,?,?,?)',
      // connection.query(articleSql.insertSql, [param.articleTitle, new Date(), param.articleTag, articleAuthor, articleContent], function(err, result) {
      //     if (err) {
      //         console.log('添加出错');
      //         jsonWrite(res, err);
      //     } else if (result) {
      //         console.log('文章添加成功');
      //         res.redirect('/admin/article');
      //     }
      // });
    });





  }


}
