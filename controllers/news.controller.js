const newsService = require("../services/news.service");

const getPublicNews = async (req, res) => {
  try {
    const news = await newsService.getAllNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPublicNewsById = async (req, res) => {
  try {
    const news = await newsService.getNewsById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNews = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const data = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date || new Date(),

      // ✅ Cloudinary se direct URL save hoga
      // image: req.file.path,

      // ❌ Local storage version (commented)
      image: req.file.path.replace(/\\/g, "/"),

      createdBy: req.user.id,
    };

    const news = await newsService.createNews(data);
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserNews = async (req, res) => {
  try {
    const news = await newsService.getUserNews(req.user.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserNewsById = async (req, res) => {
  try {
    const news = await newsService.getUserNewsById(req.params.id, req.user.id);
    if (!news) return res.status(404).json({ message: "News not found or not yours" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    };

    if (req.file) {
      // ✅ Cloudinary image URL
      // updateData.image = req.file.path;

      // ❌ Local storage version (commented)
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const news = await newsService.updateNews(
      req.params.id,
      updateData,
      req.user.id
    );

    if (!news) return res.status(404).json({ message: "News not found or not yours" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await newsService.deleteNews(req.params.id, req.user.id);
    if (!news) return res.status(404).json({ message: "News not found or not yours" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNews,
  getPublicNews,
  getPublicNewsById,
  getUserNews,
  getUserNewsById,
  updateNews,
  deleteNews,
};
