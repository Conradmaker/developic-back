const express = require("express");
const {User} = require("../models");
const {isLoggedIn} = require("./common");

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
module.exports = router;
