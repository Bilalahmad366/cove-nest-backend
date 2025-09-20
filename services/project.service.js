const Project = require("../models/project.model");
const fs = require("fs");
const path = require("path");

const getAllPublicProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};
const filterProjects = async (filters) => {
  const query = {};

  // Areas
  if (filters.areas && filters.areas.length > 0) {
    query.location = { $in: filters.areas };
  }

  // Developers
  if (filters.developers && filters.developers.length > 0) {
    query.developer_name = { $in: filters.developers };
  }

  // Handover
  if (filters.handover && filters.handover.length > 0) {
    query.handover = { $in: filters.handover };
  }

  // Property Types
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    query.property_type = { $in: filters.propertyTypes };
  }

  // Price Range
  if (filters.priceMin || filters.priceMax) {
    query.min_price = { $gte: filters.priceMin || 0 };
    query.max_price = { $lte: filters.priceMax || Number.MAX_SAFE_INTEGER };
  }

  return await Project.find(query).sort({ createdAt: -1 });
};


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
  getAllPublicProjects,
  filterProjects,
};
