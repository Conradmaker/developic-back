const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {Picstory} = require("../models");

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
router.post("/upload/photo", upload.single("image"), async (req, res, next) => {
  try {
    console.log(req.file);
    res.status(201).send(req.file.filename);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/load/picstory", async (req, res, next) => {
  try {
    const PicstoryList = await Picstory.findAll({where: {UserId: req.user.id}});
    res.status(200).json(PicstoryList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/upload/picstory", async (req, res, next) => {
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
module.exports = router;
