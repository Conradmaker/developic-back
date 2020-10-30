const express = require("express");
const {Comment, User} = require("../models");
const {isLoggedIn} = require("./common");
const router = express.Router();

//댓글작성
router.post("/add", isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      PhotoId: req.body.id,
    });
    const fullComment = await Comment.findOne({
      where: {id: comment.id},
      attributes: {exclude: ["createdAt"]},
      include: [{model: User, attributes: ["nickname"]}],
    });
    res.status(201).json(fullComment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//댓글삭제
router.delete("/delete", isLoggedIn, async (req, res, next) => {
  try {
    if (req.query.uid !== req.user.id) {
      res.status(400).send("로그아웃 후 다시 시도해 주세요.");
    }
    await Comment.destroy({where: {id: parseInt(req.query.cid, 10)}});
    res.status(200).json({id: parseInt(req.query.cid, 10)});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
