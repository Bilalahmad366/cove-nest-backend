const blogService = require("../services/blog.service");

const createBlog = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body, req.user.id);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOwnBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getOwnBlogs(req.user.id);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id, req.user.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body, req.user.id);
    if (!blog) return res.status(404).json({ message: "Blog not found or not yours" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id, req.user.id);
    if (!blog) return res.status(404).json({ message: "Blog not found or not yours" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public route
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
  const getPublicBlogById = async (req, res) => {
    try {
      const blog = await blogService.getPublicBlogById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  createBlog,
  getOwnBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getPublicBlogById,
};
