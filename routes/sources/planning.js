const express = require("express");
const db = require("../../models");
const { body, validationResult } = require("express-validator");
const { where } = require("sequelize");
const response = require("../../utils/response");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const planning = await db.PlanStudy.findAll({
      include: [db.Mahasiswa, db.CourseWork],
    });

    response.success(res, "Planning has been getter", planning);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

router.post(
  "/",
  body("mahasiswaId").isNumeric(),
  body("courseworkId").isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        response.validationError(res, errors.array());
      }

      const { mahasiswaId, courseworkId } = req.body;
      // Check if Mahasiswa is enrolled in less than 3 courses
      const mahasiswa = await db.PlanStudy.count({ where: { mahasiswaId } });
      if (mahasiswa >= 3) {
        response.error(
          res,
          "Mahasiswa cannot enroll in more than 3 courses.",
          400
        );
      }

      // Check if Mata Kuliah has less than 4 students
      const mataKuliah = await db.PlanStudy.count({ where: { courseworkId } });
      if (mataKuliah >= 4) {
        response.error(
          res,
          "Mata kuliah cannot have more than 4 students.",
          400
        );
      }

      const planning = await db.PlanStudy.create({
        mahasiswaId,
        courseworkId,
      });

      response.success(res, "Planning has been created", planning);
    } catch (err) {
      response.error(res, err.message, 500);
    }
  }
);

router.put(
  "/:id",
  body("mahasiswaId").isNumeric(),
  body("courseworkId").isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        response.validationError(res, errors.array());
      }

      const id = req.params.id;
      const { mahasiswaId, courseworkId } = req.body;

      console.log(id);
      const planningStudy = await db.PlanStudy.findOne({
        where: { id: id },
      });
      console.log(planningStudy);
      if (!planningStudy) {
        response.error(res, "Study Plan not found", 404);
      }

      if (mahasiswaId && mahasiswaId !== planningStudy.mahasiswaId) {
        const mahasiswaCourses = await db.PlanStudy.count({
          where: { mahasiswaId },
        });
        if (mahasiswaCourses >= 3) {
          response.error(
            res,
            "Mahasiswa cannot enroll in more than 3 courses.",
            400
          );
        }
      }

      if (courseworkId && courseworkId !== planningStudy.courseworkId) {
        const courseStudent = await db.PlanStudy.count({
          where: { courseworkId },
        });
        if (courseStudent >= 4) {
          response.error(
            res,
            "Mata kuliah cannot have more than 4 students.",
            400
          );
        }
      }

      const planning = await db.PlanStudy.update(req.body, {
        where: { id: id },
      });

      response.success(res, "Planning has been updated", planning);
    } catch (err) {
      response.error(res, err.message, 500);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const planning = await db.PlanStudy.destroy({ where: { id: id } });
    response.success(res, "Planning has been deleted", planning);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
