const express = require("express");
const {Apply, Qna} = require("../models");

const router = express();

//작가신청
router.post("/apply", async (req, res, next) => {
  try {
    //이부분 미들웨어로 만들자
    const incorrect = req.user.id === req.body.id;
    if (!incorrect) {
      return res.status(400).send("사용자가 맞습니까?");
    }
    const alreadyApply = await Apply.findOne({
      where: {UserId: req.body.id},
    });
    if (alreadyApply) {
      console.log(alreadyApply);
      return res.status(400).send("이미 신청하셨습니다.");
    }
    await Apply.create({
      progress: 0,
      UserId: req.body.id,
    });
    res.status(201).send("성공적으로 신청되었습니다.");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//Q&A질문등록
router.post("/addqna", async (req, res, next) => {
  try {
    //이부분 미들웨어로 만들자
    const incorrect = req.user.id === req.body.id;
    if (!incorrect) {
      return res.status(400).send("사용자가 맞습니까?");
    } else if (!req.body.title) {
      return res.status(400).send("제목을 입력하세요.");
    } else if (!req.body.content) {
      return res.status(400).send("내용을 입력하세요.");
    }
    await Qna.create({
      title: req.body.title,
      que_content: req.body.content,
      QueUserId: req.user.id,
    });
    res.status(200).send(`${req.user.id}님의 글이 등록되었습니다.`);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
