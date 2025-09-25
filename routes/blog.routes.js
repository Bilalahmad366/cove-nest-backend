const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const verifyToken = require("../middleware/auth");

// Public route
router.get("/public", blogController.getAllBlogs);
router.get("/public/:id", blogController.getPublicBlogById);
// Private routes (auth required)
router.post("/", verifyToken, blogController.createBlog);
router.get("/", verifyToken, blogController.getOwnBlogs);
router.get("/:id", verifyToken, blogController.getBlogById);
router.put("/:id", verifyToken, blogController.updateBlog);
router.delete("/:id", verifyToken, blogController.deleteBlog);

module.exports = router;
