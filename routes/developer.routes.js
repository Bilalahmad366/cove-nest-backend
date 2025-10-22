const express = require("express");
const developerController = require("../controllers/developer.controller");

const router = express.Router();
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), developerController.create);
router.get("/", developerController.getAll);
router.get("/:id", developerController.getById);
router.put("/:id", upload.single("image"), developerController.update);
router.delete("/:id", developerController.remove);

router.get("/:id/projects", developerController.getProjects);
module.exports = router;
