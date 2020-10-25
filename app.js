const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");
const db = require("./models");
const PORT = 3030;
const app = express();
dotenv.config();

db.sequelize
  .sync()
  .then(() => console.log("DB연결성공"))
  .catch(console.error("DB에러발생"));

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("123");
});
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(PORT, "에서 서버실행중");
});
