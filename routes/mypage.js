const express = require("express");
const {User, Comment, Photo, Qna} = require("../models");
const {isLoggedIn} = require("./common");
const {Op} = require("sequelize");

const router = express.Router();

//좋아요목록 조회
router.get("/like", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    if (!user) {
      return res.status(403).send("없는 유저입니다");
    }
    const likeList = await user.getLiked({
      attributes: ["id", "name", "price", "image_src"],
      include: [{model: User, attributes: ["id", "nickname"]}],
    });
    res.status(200).json(likeList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//좋아요 취소
router.delete("/like/:photoId", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    if (!user) {
      return res.status(403).send("없는 유저입니다");
    }
    await user.removeLiked(parseInt(req.params.photoId));
    res.status(200).json({id: parseInt(req.params.photoId)});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//댓글목록 조회
router.get("/comment", isLoggedIn, async (req, res, next) => {
  try {
    const CommentList = await Comment.findAll({
      where: {UserId: req.user.id},
      include: [{model: Photo, attributes: ["id", "name", "image_src"]}],
    });
    res.status(200).json(CommentList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//Qna조회
router.get("/qna", isLoggedIn, async (req, res, next) => {
  try {
    const notAnswer = await Qna.findAll({
      where: {QueUserId: req.user.id, ans_content: null},
    });
    const answered = await Qna.findAll({
      where: {QueUserId: req.user.id, ans_content: {[Op.ne]: null}},
    });
    res.status(200).send({notAnswer, answered});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//장바구니
router.get("/cart", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    const cartList = await user.getCartIn({
      model: Photo,
      attributes: ["id", "name", "price", "image_src"],
      include: [{model: User, attributes: ["id", "nickname"]}],
    });
    res.status(200).send(cartList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//장바구니일괄삭제
router.post("/carts", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    console.log(req.body.data);
    req.body.data.forEach((v) => user.removeCartIn(v));
    res.status(200).send(req.body.data);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
