const express = require("express");
const projectController = require("../controllers/project.controller");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

//public
router.get("/public", projectController.getAllPublicProjects);
router.post("/public/filter", projectController.filterProjects);

// Protected routes
router.post("/",  verifyToken, upload.array("images", 10), projectController.createProject);
router.get("/", verifyToken, projectController.getAllProjects);
router.get("/:id", verifyToken, projectController.getProjectById);
router.put("/:id",  verifyToken, upload.array("images", 10), projectController.updateProject);
router.delete("/:id", verifyToken, projectController.deleteProject);


module.exports = router;
