const express = require("express");
const logger = require("morgan");
const app = express();
const PORT = 3000;

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("123");
});

app.listen(PORT, () => {
  console.log(PORT, "에서 서버실행중");
});
