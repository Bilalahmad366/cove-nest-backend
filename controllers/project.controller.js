const projectService = require("../services/project.service");
const Project = require("../models/project.model");
const createProject = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const project = await projectService.createProject(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id; // <-- make sure this is correct string ObjectId

    // Only pick required fields, avoid passing req or next by mistake
    const data = { ...req.body };

    const project = await projectService.updateProject(projectId, data, userId);

    if (!project)
      return res.status(404).json({ message: "Project not found or not yours" });

    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




const deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id, req.user.id);
    if (!project) return res.status(404).json({ message: "Project not found or not yours" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
