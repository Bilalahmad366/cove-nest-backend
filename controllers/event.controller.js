const eventService = require("../services/event.service");

const getPublicEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPublicEventsById = async (req, res) => {
  try {
    const events = await eventService.getEventsById(req.params.id);
    if (!events) return res.status(404).json({ message: "Events not found" });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEvents = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const data = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,

      // ✅ Cloudinary se direct URL
      image: req.file.path,

      // ❌ Local storage (commented)
      // image: req.file.path.replace(/\\/g, "/"),

      createdBy: req.user.id,
    };

    const events = await eventService.createEvents(data);
    res.status(201).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserEvents = async (req, res) => {
  try {
    const events = await eventService.getUserEvents(req.user.id);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserEventsById = async (req, res) => {
  try {
    const events = await eventService.getUserEventsById(req.params.id, req.user.id);
    if (!events) return res.status(404).json({ message: "Events not found or not yours" });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvents = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
    };

    if (req.file) {
      // ✅ Cloudinary URL
      updateData.image = req.file.path;

      // ❌ Local storage (commented)
      // updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const events = await eventService.updateEvents(
      req.params.id,
      updateData,
      req.user.id
    );

    if (!events) return res.status(404).json({ message: "Events not found or not yours" });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const events = await eventService.deleteEvents(req.params.id, req.user.id);
    if (!events) return res.status(404).json({ message: "Events not found or not yours" });
    res.json({ message: "Events deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvents,
  getPublicEvents,
  getPublicEventsById,
  getUserEvents,
  getUserEventsById,
  updateEvents,
  deleteEvents,
};
