const developerService = require("../services/developer.service");

const developerController = {
  async create(req, res) {
    try {
      const developer = await developerService.createDeveloper(req.body, req.file);
      res.status(201).json({ success: true, developer });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const developers = await developerService.getAllDevelopers();
      res.status(200).json({ success: true, developers });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const developer = await developerService.getDeveloperById(req.params.id);
      res.status(200).json({ success: true, developer });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const developer = await developerService.updateDeveloper(req.params.id, req.body, req.file);
      res.status(200).json({ success: true, developer });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await developerService.deleteDeveloper(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

    // ✅ GET PROJECTS BY DEVELOPER
async getProjects(req, res) {
  try {
    const { developer, projects } = await developerService.getProjectsByDeveloper(req.params.id);
    res.status(200).json({
      success: true,
      developer,
      totalProjects: projects.length,
      projects,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to fetch projects by developer.",
    });
  }
}

};

module.exports = developerController;
