const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../../models");
const response = require("../../utils/response");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const mahasiswas = await db.Mahasiswa.findAll();

    response.success(res, "Mahasiswa has been getter", mahasiswas);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

router.post(
  "/",
  body("name").isString(),
  body("nim").isLength({ min: 8, max: 10 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        response.validationError(res, errors.array());
      }

      const mahasiswa = await db.Mahasiswa.create(req.body);
      response.success(res, "Mahasiswa has been created", mahasiswa);
    } catch (err) {
      response.error(res, err.message, 500);
    }
  }
);

router.put(
  "/:id",
  body("name").isString().optional(),
  body("nim").isLength({ min: 8, max: 10 }).optional(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        response.validationError(res, errors.array());
      }
      const id = req.params.id;
      const mahasiswa = await db.Mahasiswa.update(req.body, {
        where: { id: id },
      });

      const mahasiswaData = await db.Mahasiswa.findOne({ where: { id: id } });

      response.success(res, "Mahasiswa has been updated", mahasiswaData);
    } catch (err) {
      response.error(res, err.message, 500);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const mahasiswaData = await db.Mahasiswa.destroy({ where: { id: id } });

    response.success(res, "Mahasiswa has been deleted", mahasiswaData);
  } catch (err) {
    response.error(res, err.message, 500);
  }
});

module.exports = router;
