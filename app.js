const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const db = require("./models");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./passport");
const path = require("path");
class App {
  constructor() {
    this.app = express();
    //sequelize
    this.setDataBase();
    //passport
    this.setPassport();
    //미들웨어
    this.setMiddleWare();
    //정적 디렉토리 추가
    this.setStatic();
    //라우팅
    this.getRouting();
  }

  setDataBase() {
    dotenv.config();
    db.sequelize
      .sync()
      .then(() => console.log("DB연결성공"))
      .catch(console.error("DB에러발생"));
  }

  setPassport() {
    passportConfig();
  }

  setMiddleWare() {
    this.app.use(logger("dev"));
    this.app.use(cors({origin: true, credentials: true}));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(
      session({
        saveUninitialized: false,
        resave: true,
        secret: process.env.COOKIE_SECRET,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  setStatic() {
    this.app.use("/", express.static(path.join(__dirname, "uploads")));
  }

  getRouting() {
    this.app.use(require("./routes"));
  }
}

module.exports = new App().app;
