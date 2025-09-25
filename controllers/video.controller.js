const videoService = require("../services/video.service");

// 🔒 Create
const createVideos = async (req, res) => {
    try {
      console.log("REQ.USER ===>", req.user); 
    if (!req.body.videos || !Array.isArray(req.body.videos) || req.body.videos.length === 0) {
      return res.status(400).json({ message: "At least one video is required" });
    }

    const video = await videoService.createVideos(req.body, req.user.id);
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔒 Get My
const getMyVideos = async (req, res) => {
  try {
    const videos = await videoService.getMyVideos(req.user.id);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔒 Get Video Group By Id
const getVideosById = async (req, res) => {
    try {
      const video = await videoService.getVideosById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: "Video group not found" });
      }
      res.json(video);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// 🔒 Update
const updateVideos = async (req, res) => {
  try {
    const updated = await videoService.updateVideos(req.params.id, req.body, req.user.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔒 Delete
const deleteVideos = async (req, res) => {
  try {
    const result = await videoService.deleteVideos(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔓 Public
const getPublicVideos = async (req, res) => {
  try {
    const videos = await videoService.getPublicVideos();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createVideos,
  getMyVideos,
  getVideosById,
  updateVideos,
  deleteVideos,
  getPublicVideos,
};
