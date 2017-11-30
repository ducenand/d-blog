> 思维导图：目录servers中两个主目录，admin 和 client,admin 主要存放后台项目，后台使用ejs渲染，client 提供前台api接口，前端使用vue-cli框架，调用clien接口渲染

#### 1、创建项目目录
```
mkdir d-blog
cd d-blog

#运行
npm init 

#创建服务目录
mkdir servers

#创建项目入口文件
touch index.js

#创建admin 首先实现amdin功能
cd servers 
mkdir admin
#admin 相关结构如下图
```

#### 2、安装依赖模块
```
npm i mysql config-lite connect-flash ejs express express-formidable connect-redis express-session redis marked moment sha1 winston express-winston --save
mysql:数据库
express: web 框架
express-session: session 中间件
redis: 持久化保存session
connect-redis: session 保存到redis
connect-flash: 页面通知的中间件，基于 session 实现
ejs: 模板
express-formidable:接收表单及文件上传的中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件



```
## 更新记录

#### 2017.11.22 /基本框架搭建
#### 2017.11.24 /使用mysql
#### 2017.11.28 /添加后台页面
#### 2017.11.29 /增加用户表，后台实现增加用户功能

## 踩的坑
#### express 处理参数中间件 body-parser、express-formidable 不能同时用，




