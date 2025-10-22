const projectService = require("../services/project.service");

const getAllPublicProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllPublicProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjectByIdPublic = async (req, res) => {
  try {
    const project = await projectService.getProjectByIdPublic(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterProjects = async (req, res) => {
  try {
    // ✅ Extract filters from body or query
    const filters = req.body || {};

    // ✅ Call service function
    const projects = await projectService.filterProjects(filters);

    // ✅ Send response
    res.status(200).json({
      success: true,
      total: projects.length,
      projects,
    });
  } catch (err) {
    console.error("❌ Filter Projects Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to filter projects",
      error: err.message,
    });
  }

}

// 🟢 Create project
const createProject = async (req, res) => {
  try {
    // Local upload (OLD)
    //  const images = req.files ? req.files.map((file) => file.path) : [];
    // Cloudinary upload (NEW)

    // 🟢 Parse payment_plans if JSON string
    if (req.body.payment_plans) {
      req.body.payment_plans = JSON.parse(req.body.payment_plans);
    }
    const images = req.files ? req.files.map((file) => file.path) : [];

    const data = { ...req.body, createdBy: req.user.id, images };
    if (req.files && req.files.length > 0) {
      data.images = req.files.map(file => file.path.replace(/\\/g, "/"));
    }

    const project = await projectService.createProject(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 Update project
const updateProject = async (req, res) => {
  try {
  if (req.body.payment_plans) {
  try {
    // Agar string hai to parse karo
    if (typeof req.body.payment_plans === "string") {
      req.body.payment_plans = JSON.parse(req.body.payment_plans);
    }
  } catch (err) {
    console.warn("Failed to parse payment_plans:", err.message);
  }
}
      const projectId = req.params.id;
      const userId = req.user.id;

      let oldImages = [];
      if (req.body.existingImages) {
        oldImages = Array.isArray(req.body.existingImages)
          ? req.body.existingImages
          : [req.body.existingImages];
      }

      let newImages = [];
      if (req.files && req.files.length > 0) {
        // Local upload (OLD)
        // newImages = req.files.map((file) => file.path.replace(/\\/g, "/"));

        // Cloudinary upload (NEW)
        newImages = req.files.map((file) => file.path);
      }

      // Merge old + new
      const data = { ...req.body, images: [...oldImages, ...newImages] };

      const project = await projectService.updateProject(projectId, data, userId);

      if (!project)
        return res.status(404).json({ message: "Project not found or not yours" });

      res.json(project);
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
    getAllPublicProjects,
    filterProjects,
    getProjectByIdPublic,
  };
