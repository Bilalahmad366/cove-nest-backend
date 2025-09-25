const express = require("express");
const router = express.Router();

const videoController = require("../controllers/video.controller")
const verifyToken = require("../middleware/auth");

// 🔓 Public
router.get("/public", videoController.getPublicVideos);

// 🔒 Protected
router.post("/", verifyToken, videoController.createVideos);
router.get("/:id", videoController.getVideosById);
router.get("/", verifyToken, videoController.getMyVideos);
router.put("/:id", verifyToken, videoController.updateVideos);
router.delete("/:id", verifyToken, videoController.deleteVideos);

module.exports = router;

