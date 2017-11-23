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
  }

}
