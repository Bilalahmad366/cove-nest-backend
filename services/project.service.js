const Project = require("../models/project.model");
const fs = require("fs");
const path = require("path");

const createProject = async (data) => {
  const { images, ...rest } = data;

  const project = new Project({
    ...rest,
    images: images || [],
  });

  return await project.save();
};

const updateProject = async (id, data, userId) => {
  const {
    project_name,
    developer_name,
    location,
    city,
    area,
    size,
    property_type,
    min_price,
    max_price,
    plan_status,
    handover,
    bedrooms,
    images,
    newImages,
  } = data;


  const project = await Project.findOne({ _id: id, createdBy: userId });
  if (!project) return null;

  const removedImages = project.images.filter((img) => !images.includes(img));
  removedImages.forEach((img) => {
    const filePath = path.join(__dirname, "..", img);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("❌ File delete error:", filePath, err.message);
      } else {
        console.log("✅ Deleted file:", filePath);
      }
    });
  });


  const updateData = {
    project_name,
    developer_name,
    location,
    city,
    area,
    property_type,
    min_price,
    max_price,
    plan_status,
    handover,
    bedrooms,
    size,
    images: [
      ...(images || []),
      ...(newImages || []),
    ],
  };


  return await Project.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: updateData },
    { new: true }
  );
};


const getAllProjects = async (userId) => {
  return await Project.find({ createdBy: userId }).sort({ createdAt: -1 });
};

const getProjectById = async (id, userId) => {
  return await Project.findOne({ _id: id, createdBy: userId });
};

const deleteProject = async (id, userId) => {
  const project = await Project.findOneAndDelete({ _id: id, createdBy: userId });

  if (!project) return null;

  // Server se saare images delete karo
  if (project.images && project.images.length > 0) {
    project.images.forEach((img) => {
      const filePath = path.join(process.cwd(), img); // absolute path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("❌ File delete error:", filePath, err.message);
        } else {
          console.log("✅ Deleted file:", filePath);
        }
      });
    });
  }

  return project;
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
