const express = require("express");
const bcrypt = require("bcrypt");
const {User} = require("../models");
const passport = require("passport");
const {isLoggedIn, isNotLoggedIn} = require("./common");

const router = express.Router();

//로그인
router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.logIn(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUser = await User.findOne({
        where: {id: user.id},
        attributes: {exclude: ["password"]},
      });

      return res.status(200).json(fullUser);
    });
  })(req, res, next);
});
//회원가입
router.post("/signup", isNotLoggedIn, async (req, res, next) => {
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
//로그아웃
router.get("/logout", isLoggedIn, (req, res, next) => {
  try {
    req.logOut();
    req.session.destroy();
    res.status(200).send("로그아웃 되었습니다.");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//로그인유지
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUser = await User.findOne({
        where: {id: req.user.id},
        attributes: {exclude: ["password"]},
      });
      res.status(200).json(fullUser);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
