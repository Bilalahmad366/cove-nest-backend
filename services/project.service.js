const Project = require("../models/project.model");

const createProject = async (data) => {
  const { handoverFrom, handoverTo, ...rest } = data;

  const project = new Project({
    ...rest,
    handover: {
      from: handoverFrom ? new Date(handoverFrom) : null,
      to: handoverTo ? new Date(handoverTo) : null,
    },
  });

  return await project.save();
};
const getAllProjects = async (userId) => {
  return await Project.find({ createdBy: userId }).sort({ createdAt: -1 });
};

const getProjectById = async (id, userId) => {
  return await Project.findOne({ _id: id, createdBy: userId });
};

const updateProject = async (id, data, userId) => {
  const {
    project_name,
    developer_name,
    location,
    city,
    size,
    property_type,
    min_price,
    max_price,
    plan_status,
    handoverFrom,
    handoverTo,
  } = data;

  const updateData = {
    project_name,
    developer_name,
    location,
    city,
    size,
    property_type,
    min_price,
    max_price,
    plan_status,
  };

  if (handoverFrom || handoverTo) {
    updateData.handover = {
      from: handoverFrom ? new Date(handoverFrom) : null,
      to: handoverTo ? new Date(handoverTo) : null,
    };
  }

  // Make sure createdBy is never overwritten
  return await Project.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: updateData },
    { new: true }
  );
};



const deleteProject = async (id, userId) => {
  return await Project.findOneAndDelete({ _id: id, createdBy: userId });
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
