const express = require("express");
const areaController = require("../controllers/area.controller");
const upload = require("../middleware/upload");

const router = express.Router();

// ✅ CREATE AREA
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "section_images", maxCount: 10 },
  ]),
  areaController.create
);

// ✅ UPDATE AREA
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "section_images", maxCount: 10 },
  ]),
  areaController.update
);

// ✅ GET ALL AREAS
router.get("/", areaController.getAll);

// ✅ GET AREA BY ID
router.get("/:id", areaController.getById);

// ✅ GET AREA BY SLUG
router.get("/:slug", areaController.getBySlug);

// ✅ DELETE AREA
router.delete("/:id", areaController.remove);

// ✅ GET PROJECTS BY AREA SLUG
router.get("/:slug/projects", areaController.getProjectsBySlug);

module.exports = router;
