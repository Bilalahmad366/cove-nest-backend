const express = require("express");
const projectController = require("../controllers/project.controller");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Protected routes
router.post("/", verifyToken, projectController.createProject);
router.get("/", verifyToken, projectController.getAllProjects);
router.get("/:id", verifyToken, projectController.getProjectById);
router.put("/:id", verifyToken, projectController.updateProject);
router.delete("/:id", verifyToken, projectController.deleteProject);

module.exports = router;
