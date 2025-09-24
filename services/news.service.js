
const News = require("../models/news.model");

const createNews = async (data) => {
  const news = new News(data);
  return await news.save();
};

const getAllNews = async () => {
  return await News.find().sort({ createdAt: -1 });
};

const getNewsById = async (id) => {
  return await News.findById(id);
};

const getUserNews = async (userId) => {
  return await News.find({ createdBy: userId }).sort({ createdAt: -1 });
};

const getUserNewsById = async (id, userId) => {
  return await News.findOne({ _id: id, createdBy: userId });
};

const updateNews = async (id, data, userId) => {
  return await News.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: data },
    { new: true }
  );
};

const deleteNews = async (id, userId) => {
  return await News.findOneAndDelete({ _id: id, createdBy: userId });
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  getUserNews,
  getUserNewsById,
  updateNews,
  deleteNews,
};