const express = require("express");
const bcrypt = require("bcrypt");
const {User} = require("../models");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (exUser) {
      res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    await User.create({
      id: req.body.id,
      password: hashedPwd,
      email: req.body.email,
      nickname: req.body.name,
    });
    res.status(201).send("회원가입에 성공했습니다.");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
