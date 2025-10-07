const expertService = require("../services/expert.service");

const createExperts = async (req, res) => {
  try {
    const expert = await expertService.createExpert(req.body);
    res.status(201).json(expert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getExperts = async (req, res) => {
  try {
    const experts = await expertService.getAllExperts();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createExperts,
  getExperts,
};