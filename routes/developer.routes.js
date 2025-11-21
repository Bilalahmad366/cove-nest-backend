const express = require("express");
const developerController = require("../controllers/developer.controller");

const router = express.Router();
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), developerController.create);
router.get("/", developerController.getAll);
// ✅ GET AREA BY SLUG
router.get("/:id", developerController.getById);
router.get("/:slug", developerController.getBySlug);
router.put("/:id", upload.single("image"), developerController.update);
router.delete("/:id", developerController.remove);

// ✅ GET PROJECTS BY AREA SLUG
router.get("/:slug/projects", developerController.getProjectsBySlug);
router.get("/:id/projects", developerController.getProjects);
module.exports = router;
