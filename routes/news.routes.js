// routes/news.routes.js
const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/public", newsController.getPublicNews);
router.get("/public/:id", newsController.getPublicNewsById);

router.post("/", verifyToken, upload.single("image"), newsController.createNews);
router.get("/", verifyToken, newsController.getUserNews);
router.get("/:id", verifyToken, newsController.getUserNewsById);
router.put("/:id", verifyToken, upload.single("image"), newsController.updateNews);
router.delete("/:id", verifyToken, newsController.deleteNews);

module.exports = router;
