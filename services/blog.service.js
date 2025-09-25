const Blog = require("../models/model.blog");

const createBlog = async (data, userId) => {
  return await Blog.create({ ...data, createdBy: userId });
};

const getOwnBlogs = async (userId) => {
  return await Blog.find({ createdBy: userId }).populate("sections.projectRef.projectId");
};

const getBlogById = async (id, userId) => {
  return await Blog.findOne({ _id: id, createdBy: userId }).populate("sections.projectRef.projectId");
};

const updateBlog = async (id, data, userId) => {
  return await Blog.findOneAndUpdate(
    { _id: id, createdBy: userId },
    data,
    { new: true }
  ).populate("sections.projectRef.projectId");
};

const deleteBlog = async (id, userId) => {
  return await Blog.findOneAndDelete({ _id: id, createdBy: userId });
};

// Public: Get all blogs
const getAllBlogs = async () => {
  return await Blog.find()
    .populate("sections.projectRef.projectId"); 
};
const getPublicBlogById = async (id) => {
    return await Blog.findById(id)
      .populate("sections.projectRef.projectId");
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
