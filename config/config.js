const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "developic_db",
    host: "conrad-mysql.chtq1vmeaauu.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "developic_db",
    host: "conrad-mysql.chtq1vmeaauu.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "developic_db",
    host: "conrad-mysql.chtq1vmeaauu.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
  },
};
