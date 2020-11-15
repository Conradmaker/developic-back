const express = require("express");
const router = express.Router();

router.use("/load", require("./load"));
router.use("/user", require("./user"));
router.use("/about", require("./about"));
router.use("/photo", require("./photo"));
router.use("/comment", require("./comment"));
router.use("/mypage", require("./mypage"));

module.exports = router;
