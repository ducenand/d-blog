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


const tocObj = {
  add: function(text, level) {
    var anchor = `#toc${level}${++this.index}`;
    this.toc.push({ anchor: anchor, level: level, text: text });
    return anchor;
  },
  // 使用堆栈的方式处理嵌套的ul,li，level即ul的嵌套层次，1是最外层
  // <ul>
  //   <li></li>
  //   <ul>
  //     <li></li>
  //   </ul>
  //   <li></li>
  // </ul>
  toHTML: function() {
    let levelStack = [];
    let result = '';
    const addStartUL = () => { result += '<ul>'; };
    const addEndUL = () => { result += '</ul>\n'; };
    const addLI = (anchor, text) => { result += '<li><a href="#' + anchor + '">' + text + '<a></li>\n'; };

    this.toc.forEach(function(item) {
      let levelIndex = levelStack.indexOf(item.level);
      // 没有找到相应level的ul标签，则将li放入新增的ul中
      if (levelIndex === -1) {
        levelStack.unshift(item.level);
        addStartUL();
        addLI(item.anchor, item.text);
      } // 找到了相应level的ul标签，并且在栈顶的位置则直接将li放在此ul下
      else if (levelIndex === 0) {
        addLI(item.anchor, item.text);
      } // 找到了相应level的ul标签，但是不在栈顶位置，需要将之前的所有level出栈并且打上闭合标签，最后新增li
      else {
        while (levelIndex--) {
          levelStack.shift();
          addEndUL();
        }
        addLI(item.anchor, item.text);
      }
    });
    // 如果栈中还有level，全部出栈打上闭合标签
    while (levelStack.length) {
      levelStack.shift();
      addEndUL();
    }
    // 清理先前数据供下次使用
    this.toc = [];
    this.index = 0;
    return result;
  },
  toc: [],
  index: 0
}



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

    var renderer = new marked.Renderer();
    renderer.heading = function(text, level, raw) {
      var anchor = tocObj.add(text, level);
      return `<a id=${anchor} class="anchor-fix"></a><h${level}>${text}</h${level}>\n`;
    }




    const title = req.fields.title
    const markdown_content = req.fields.content
    const content = this.codeHighlight(markdown_content,renderer)
    const toc = tocObj.toHTML()
    console.log(toc)
    const uid = req.session.user.id
    let create_time = moment().format('YYYY-MM-DD HH:mm:ss')
    let summary
    if (markdown_content.indexOf("<!--more-->") !== -1) {
      summary = markdown_content.split("<!--more-->")[0];
    } else {
      summary = '';
    }

    pool.getConnection(function(error, connection) {

      connection.query('INSERT INTO post (uid,title,markdown_content,content,summary,toc,create_time) values(?,?,?,?,?,?,?)', [uid, title, markdown_content, content, summary, toc, create_time], function(error, results, fields) {
        if (!error) {
          req.flash('success', '发布成功')
          res.redirect('back')
        } else {
          req.flash('error', 'sql错误，请联系管理员')
          res.redirect('back')
        }

        connection.release()


      })

    })

  },
  preview: function(req, res, next) {

    pool.getConnection(function(error, connection) {
      connection.query('SELECT * FROM post WHERE uid = ? and id = ?', [9, 19], function(error, results, fields) {
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
  codeHighlight: function(markdownString,renderer) {
    // var markdownString = '```js\n console.log("hello"); \n```';

    // Async highlighting with pygmentize-bundled
    // marked.setOptions({
    //   highlight: function(code, lang, callback) {
    //     require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function(err, result) {
    //       callback(err, result.toString())
    //     })
    //   }
    // });

    // Using async version of marked
    marked(markdownString, function(err, content) {
      if (err) throw err
      // console.log(content);
    })

    // Synchronous highlighting with highlight.js
    marked.setOptions({
      renderer: renderer,
      highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value
      }
    })

    return marked(markdownString)



  }


}
