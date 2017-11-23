module.exports = {

  port: 5200,
  session: {
    secret: 'd-blog',
    key: 'd-blog',
    maxAge: 2592000000
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'd-blog',
    port: 3306
  },
  redis:{
    host: "127.0.0.1",
    port: 6379,
    ttl: 1800 // 过期时间
  }

}
