var express = require("express");
var mahasiswa = require("./sources/mahasiswa.js");
var course = require("./sources/course.js");
var planning = require("./sources/planning.js");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Hello World!" });
  // res.render("index", { title: "Express" });
});

router.use("/mahasiswa", mahasiswa);
router.use("/course", course);
router.use("/planning", planning);

module.exports = router;
