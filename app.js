const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const db = require("./models");
const cors = require("cors");
const userRouter = require("./routes/user");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./passport");

const PORT = 3030;
const app = express();
dotenv.config();

db.sequelize
  .sync()
  .then(() => console.log("DB연결성공"))
  .catch(console.error("DB에러발생"));
passportConfig();
app.use(logger("dev"));
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: true,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("123");
});
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(PORT, "에서 서버실행중");
});
