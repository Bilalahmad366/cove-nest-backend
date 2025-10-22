const express = require("express");
const areaController = require("../controllers/area.controller");

const router = express.Router();
const upload = require("../middleware/upload");

// router.post("/", upload.single("image"), areaController.create);
router.get("/", areaController.getAll);
router.get("/:id", areaController.getById);
// router.put("/:id", upload.single("image"), areaController.update);
// backend/routes/area.routes.js

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "section_images", maxCount: 10 } // max 10 sections
  ]),
  areaController.create
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "section_images", maxCount: 10 }
  ]),
  areaController.update
);

router.delete("/:id", areaController.remove);

router.get("/:id/projects", areaController.getProjects);

module.exports = router;
