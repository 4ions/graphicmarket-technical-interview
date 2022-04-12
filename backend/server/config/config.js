const config = require('../../config')

module.exports = {
  development: {
    username: config.user,
    password: config.pass,
    database: config.database,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: config.user,
    password: config.pass,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: config.user,
    password: config.pass,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
}
