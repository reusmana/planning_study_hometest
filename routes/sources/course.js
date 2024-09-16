const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../../models");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const { where } = require("sequelize");
const response = require("../../utils/response");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const course = await db.CourseWork.findAll();
    response.success(res, "Course has been getter", course);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

router.post("/", body("name").isString(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.validationError(res, errors.array());
    }

    const course = await db.CourseWork.create({
      name: req.body.name,
      kode: uuidv4(),
    });
    response.success(res, "Course has been created", course);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

router.put("/:id", body("name").isString().optional(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.validationError(res, errors.array());
    }

    const id = req.params.id;
    const course = await db.CourseWork.update(req.body, {
      where: { id: id },
    });

    response.success(res, "Course has been updated", course);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await db.CourseWork.findOne({
      where: { id: id },
    });

    course.destroy();
    response.success(res, "Course has been deleted", course);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

module.exports = router;
