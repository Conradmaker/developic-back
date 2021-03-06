const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {Picstory, Photo, Comment, User, PDclare} = require("../models");
const {isLoggedIn} = require("./common");

const router = express.Router();
try {
  fs.accessSync("uploads");
} catch (e) {
  console.log("폴더가 없어서 생성하겠습니다.");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, res, done) {
      done(null, "uploads");
    },
    filename(req, res, done) {
      const ext = path.extname(res.originalname);
      const basename = path.basename(res.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: {fieldSize: 20 * 1024 * 1024},
});

//이미지업로드
router.post(
  "/upload/photo",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      res.status(201).send(req.file.filename);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);
//작품업로드
router.post("/upload/post", isLoggedIn, async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(400).send("로그인해주세요.");
    }
    const newPhoto = await Photo.create({
      name: req.body.name,
      sale: req.body.sale ? 1 : 0,
      price: req.body.price,
      image_src: req.body.src,
      info: req.body.info,
      catagory: req.body.catagory,
      UserId: req.user.id,
    });
    if (req.body.picstory) {
      const album = await Picstory.findOne({where: {id: req.body.picstory}});
      await album.addPhoto(newPhoto.id);
    }
    res.status(201).send("성공적으로 생성되었습니다.");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//픽스토리 불러오기
router.get("/load/picstory", isLoggedIn, async (req, res, next) => {
  try {
    const PicstoryList = await Picstory.findAll({where: {UserId: req.user.id}});
    res.status(200).json(PicstoryList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//픽스토리생성
router.post("/upload/picstory", isLoggedIn, async (req, res, next) => {
  try {
    const newPicstory = await Picstory.create({
      name: req.body.name,
      UserId: req.user.id,
    });
    res.status(201).json(newPicstory);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//작품신고
router.post("/declare", isLoggedIn, async (req, res, next) => {
  try {
    await PDclare.create({
      reason: req.body.reason,
      UserId: req.body.userId,
      PhotoId: req.body.photoId,
    });
    res.status(201).send("신고신청완료");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//좋아요
router.post("/like", isLoggedIn, async (req, res, next) => {
  try {
    const photo = await Photo.findOne({where: {id: req.body.photoId}});
    if (!photo) {
      return res.status(403).send("게시글이 없어요!");
    }
    await photo.addLikers(req.body.userId);
    res.status(201).json({id: req.body.userId});
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/unlike", isLoggedIn, async (req, res, next) => {
  try {
    const photo = await Photo.findOne({where: {id: req.body.photoId}});
    if (!photo) {
      return res.status(403).send("게시글이 없어요!");
    }
    await photo.removeLikers(req.body.userId);
    res.status(200).json({id: req.body.userId});
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
