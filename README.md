> 思维导图：目录servers中两个主目录，admin 和 client,admin 主要存放后台项目，后台使用ejs渲染，client 提供前台api接口，前端使用vue-cli框架，调用clien接口渲染

## 关键词

```
- 打通前后台
- express
- vue
- mysql
- redis
- markdown
- webpack
```

## 用法

安装依赖包

npm install

运行开发环境

npm run dev

build前端代码

npm run build

## 更新记录

#### 2017.11.22 /基本框架搭建
#### 2017.11.24 /使用mysql
#### 2017.11.28 /添加后台页面
#### 2017.11.29 /增加用户表，后台实现增加用户功能
#### 2017.11.30 /增加文章表，后台实现添加文章
#### 2017.12.01 /markdown文档保存前端样式调整
#### 2017.12.02 /增加预览页
#### 2017.12.05 /增加文章编辑，优化文章预览
#### 2017.12.07 /增加所有文章列表
#### 2017.12.22 /中间开发了一个小程序，硬性指标，下班加点优先完成
#### 2017.12.26 /融合vue-cli,前后台一个框架开发
#### 2017.12.27 /supervisor 进程管理改为nodemon,前端支持less
 

## 踩的坑

#### express 处理参数中间件 body-parser、express-formidable 不能同时用，
#### simplemde.value(<%= 放入markdown文本 %>); 复杂文本不能解析
#### marked 解析出现第二次更新会出现两个目录




