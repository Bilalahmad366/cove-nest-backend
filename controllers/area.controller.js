const areaService = require("../services/area.service");

const areaController = {
  async create(req, res) {
    try {
      const area = await areaService.createArea(req.body, req.files);
      res.status(201).json({ success: true, area });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const area = await areaService.updateArea(req.params.id, req.body, req.files);
      res.status(200).json({ success: true, area });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const areas = await areaService.getAllAreas();
      res.status(200).json({ success: true, areas });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const area = await areaService.getAreaById(req.params.id);
      res.status(200).json({ success: true, area });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

 

  async remove(req, res) {
    try {
      const result = await areaService.deleteArea(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async getProjects(req, res) {
    try {
      const { area, projects } = await areaService.getProjectsByArea(req.params.id);
      res.status(200).json({
        success: true,
        area,
        totalProjects: projects.length,
        projects,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};

module.exports = areaController;
