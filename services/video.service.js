const Video = require("../models/video.model");

// 🔒 Create Video Group
const createVideos = async (data, userId) => {
  return await Video.create({
    videos: data.videos,
    createdBy: userId, 
  });
};

// 🔒 Get My Video Groups
const getMyVideos = async (userId) => {
  return await Video.find({ createdBy: userId }).sort({ createdAt: -1 });
};

const getVideosById = async (id) => {
    return await Video.findById(id);
  };

  
// 🔒 Update Video Group
const updateVideos = async (id, data, userId) => {
  const videoDoc = await Video.findById(id);
  if (!videoDoc) throw new Error("Video group not found");

  if (videoDoc.createdBy.toString() !== userId.toString()) {
    throw new Error("Not allowed");
  }

  if (data.videos && Array.isArray(data.videos)) {
    videoDoc.videos = data.videos;
  }

  return await videoDoc.save();
};

// 🔒 Delete Video Group
const deleteVideos = async (id, userId) => {
  const videoDoc = await Video.findById(id);
  if (!videoDoc) throw new Error("Video group not found");

  if (videoDoc.createdBy.toString() !== userId.toString()) {
    throw new Error("Not allowed");
  }

  await videoDoc.deleteOne();
  return { message: "Video group deleted" };
};

// 🔓 Public Videos
const getPublicVideos = async () => {
  return await Video.find().sort({ createdAt: -1 });
};

module.exports = {
  createVideos,
  getMyVideos,
  updateVideos,
  getVideosById,
  deleteVideos,
  getPublicVideos,
};
