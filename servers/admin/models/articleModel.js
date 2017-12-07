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

/* markdown 文件生成目录===start */
const tocObj = {
  add: function(text, level) {
    var anchor = `#toc${level}${++this.index}`
    this.toc.push({ anchor: anchor, level: level, text: text })
    return anchor
  },
  toHTML: function() {
    let levelStack = []
    let result = ''
    const addStartUL = () => { result += '<ul>' }
    const addEndUL = () => { result += '</ul>\n' }
    const addLI = (anchor, text) => { result += '<li><a href="#' + anchor + '">' + text + '<a></li>\n' }
    this.toc.forEach(function(item) {

      let levelIndex = levelStack.indexOf(item.level);
      // 没有找到相应level的ul标签，则将li放入新增的ul中
      if (levelIndex === -1) {
        levelStack.unshift(item.level)
        addStartUL();
        addLI(item.anchor, item.text)
      } // 找到了相应level的ul标签，并且在栈顶的位置则直接将li放在此ul下
      else if (levelIndex === 0) {
        addLI(item.anchor, item.text)
      } // 找到了相应level的ul标签，但是不在栈顶位置，需要将之前的所有level出栈并且打上闭合标签，最后新增li
      else {
        while (levelIndex--) {
          levelStack.shift()
          addEndUL()
        }
        addLI(item.anchor, item.text)
      }
    });
    // 如果栈中还有level，全部出栈打上闭合标签
    while (levelStack.length) {
      levelStack.shift()
      addEndUL()
    }
    // 清理先前数据供下次使用
    this.toc = []
    this.index = 0
    return result
  },
  toc: [],
  index: 0
}

var renderer = new marked.Renderer()

renderer.heading = function(text, level, raw) {
  var anchor = tocObj.add(text, level)
  return `<a id=${anchor} class="anchor-fix"></a><h${level}>${text}</h${level}>\n`;
}

marked.setOptions({
  renderer: renderer,
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})
/* markdown 文件生成目录===end */

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
  writingGet: function(req, res, next) {

    const uid = req.session.user.id
    const author = req.session.user.username
    const create_time = moment().format('YYYY-MM-DD HH:mm:ss')
    pool.getConnection(function(error, connection) {
      connection.query('INSERT INTO post (uid,create_time,status,author) value (?,?,?,?)', [uid,create_time,author,5], function(error, results, fields) {

        if (!error) {
          res.render('writing', { data: { article_id: results.insertId } })
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release()

      })
    })
  },
  writingPost: function(req, res, next) {

    const title = req.fields.title
    const markdown_content = req.fields.content
    const content = marked(markdown_content)
    const toc = tocObj.toHTML()
    const toc_status = req.fields.toc_status
    const status = 3

    const id = req.fields.id
    const uid = req.session.user.id
    const author = req.session.user.username

    let create_time = moment().format('YYYY-MM-DD HH:mm:ss')
    let summary
    if (markdown_content.indexOf("<!--more-->") !== -1) {
      summary = markdown_content.split("<!--more-->")[0];
    } else {
      summary = '';
    }

    pool.getConnection(function(error, connection) {

      connection.query('UPDATE post SET title=?,markdown_content=?,content=?,summary=?,toc=?,create_time=?,toc_status=?,status=?,author=? WHERE id=? AND uid =?', [title, markdown_content, content, summary, toc, create_time, toc_status, status,author,id, uid], function(error, results, fields) {

        if (!error) {
          req.flash('success', '发布成功')
          res.redirect('/admin/edit/' + id)
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release()


      })

    })
  },
  preview: function(req, res, next) {
    const uid = req.session.user.id
    const id = req.params.id
    pool.getConnection(function(error, connection) {
      connection.query('SELECT * FROM post WHERE uid = ? and id = ?', [uid, id], function(error, results, fields) {
        if (!error) {
          res.render('preview', { data: results[0] })
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release()
      })

    })
  },
  editArticlePost: function(req, res, next) {
    this.commonRequest(req,res,function(results){

      req.flash('success', '更新成功')
      res.redirect('back')
    })
  },
  commonRequest: function(req,res,callback) {

    const title = req.fields.title
    const markdown_content = req.fields.content

    const content = marked(markdown_content)

    const toc = tocObj.toHTML()

    const toc_status = req.fields.toc_status
    const status = req.fields.status

    const id = req.fields.id
    const uid = req.session.user.id
    const author = req.session.user.username
    let update_time = moment().format('YYYY-MM-DD HH:mm:ss')
    let summary
    if (markdown_content.indexOf("<!--more-->") !== -1) {
      summary = markdown_content.split("<!--more-->")[0];
    } else {
      summary = '';
    }

    pool.getConnection(function(error, connection) {

      connection.query('UPDATE post SET title=?,markdown_content=?,content=?,summary=?,toc=?,update_time=?,toc_status=?,status=?,author=? WHERE id=? AND uid =?', [title, markdown_content, content, summary, toc, update_time, toc_status, status,author, id, uid], function(error, results, fields) {

        if (!error) {
          typeof callback == 'function' && callback(results)
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release()


      })

    })
  },
  updataArticle: function(req, res, next) {
    this.commonRequest(req,res,function(results){
      jsonWrite(res, { code: 0, msg: results })
    })
  },
  editArticle: function(req, res, next) {
    const uid = req.session.user.id
    const id = req.params.id
    pool.getConnection(function(error, connection) {
      connection.query('SELECT * FROM post WHERE id = ? AND uid = ?', [id, uid], function(error, results, fields) {

        if (!error) {

          res.render('editarticle', { data: results[0] })
        } else {
          jsonWrite(res)
        }
        connection.release()

      })
    })

  },
  allArticle: function(req,res,next) {

    pool.getConnection(function(error, connection) {

      var count = {
        num:0,  //全部
        num1:0, //已发布
        num2:0  //草稿
      }
      connection.query('SELECT ( SELECT COUNT( * ) FROM `post` WHERE `status` = 3 ) AS `num1`, ( SELECT COUNT( * ) FROM `post` WHERE `status` = 0 ) AS `num2`',function(error, results, fields) {
        if (!error) {
          count.num1 = results[0].num1
          count.num2 = results[0].num2
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

      })



      connection.query('SELECT * FROM post WHERE status<5',function(error, results, fields) {
        if (!error) {
          count.num = results.length
          res.render('allarticle', { data: results,count:count })
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release()
      })

    })

  }

}
