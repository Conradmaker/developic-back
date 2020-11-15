const exporess = require("express");
const {where} = require("sequelize");
const {Op} = require("sequelize");
const {Photo, User, Comment, Picstory} = require("../models");

const router = exporess.Router();

router.get("/main", async (req, res, next) => {
  try {
    const shop = await Photo.findAll({
      where: {sale: 0, state: 0},
      limit: 10,
      attributes: {exclude: ["info", "sale"]},
      include: [
        {model: User, attributes: ["nickname"]},
        {model: User, as: "Likers", attributes: ["id"]},
      ],
      order: [["createdAt", "DESC"]],
    });
    const feed = await Photo.findAll({
      where: {state: 0},
      limit: 10,
      attributes: {exclude: ["info", "price", "sale"]},
      include: [
        {model: User, attributes: ["nickname"]},
        {model: User, as: "Likers", attributes: ["id"]},
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({feed, shop});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/feed/:cata", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = {[Op.lt]: parseInt(req.query.lastId, 10)};
    }
    if (parseInt(req.params.cata, 10) !== 5) {
      where.catagory = parseInt(req.params.cata, 10);
    }
    console.log(where);
    const feeds = await Photo.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      attributes: {exclude: ["info", "price", "sale"]},
      include: [
        {model: User, attributes: ["nickname"]},
        {model: User, as: "Likers", attributes: ["id"]},
      ],
    });
    console.log(feeds);
    res.status(200).json(feeds);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/shop/:cata", async (req, res, next) => {
  try {
    const where = {sale: 0};
    if (parseInt(req.params.cata, 10) !== 5) {
      where.catagory = parseInt(req.params.cata, 10);
    }
    if (parseInt(req.query.lastId, 10)) {
      where.id = {[Op.lt]: parseInt(req.query.lastId, 10)};
    }
    const shops = await Photo.findAll({
      where,
      order: [["createdAt", "DESC"]],
      attributes: {exclude: ["info", "sale"]},
      include: [
        {model: User, attributes: ["nickname"]},
        {model: User, as: "Likers", attributes: ["id"]},
      ],
    });
    res.status(200).json(shops);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//상세정보 불러오기
router.get("/detail/:photoId", async (req, res, next) => {
  try {
    const photo = await Photo.findOne({
      where: {id: req.params.photoId},
      include: [
        {model: User, attributes: ["id", "nickname"]},
        {model: User, as: "Shoper", attributes: ["id"]},
        {model: User, as: "Likers", attributes: ["id"]},
        {
          model: Comment,
          attributes: {exclude: ["createdAt"]},
          include: [{model: User, attributes: ["id", "avatar", "nickname"]}],
        },
      ],
    });
    res.status(200).json(photo);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//프로필과 최신글 10개 불러오기 (인피니트는 따로 라우팅)
router.get("/profile/:userId", async (req, res, next) => {
  try {
    where: {
    }
    const profile = await User.findOne({
      where: {id: req.params.userId},
      attributes: {
        exclude: ["password", "lastLogin", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Picstory,
          attributes: {
            exclude: ["updatedAt"],
          },
        },
      ],
    });
    where.userId = req.params.userId;
    const picstory = await Picstory.findAll({
      where,
      attributes: {exclude: ["createdAt", "UserId"]},
      include: [
        {
          model: Photo,
          attributes: {exclude: ["createdAt", "UserId", "info"]},
          include: [
            {model: User, attributes: ["nickname"]},
            {model: User, as: "Likers", attributes: ["id"]},
          ],
        },
      ],
    });
    if (parseInt(req.query.lastId, 10)) {
      where.id = {[Op.lt]: parseInt(req.query.lastId, 10)};
    }

    const userPhotos = await Photo.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      attributes: {exclude: ["info", "price", "sale"]},
      include: [
        {model: User, attributes: ["nickname"]},
        {model: User, as: "Likers", attributes: ["id"]},
      ],
    });
    res.status(200).json({profile, userPhotos, picstory});
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
