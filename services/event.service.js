
const Events = require("../models/event.model");

const createEvents = async (data) => {
  const events = new Events(data);
  return await events.save();
};

const getAllEvents = async () => {
  return await Events.find().sort({ createdAt: -1 });
};

const getEventsById = async (id) => {
  return await Events.findById(id);
};

const getUserEvents = async (userId) => {
  return await Events.find({ createdBy: userId }).sort({ createdAt: -1 });
};

const getUserEventsById = async (id, userId) => {
  return await Events.findOne({ _id: id, createdBy: userId });
};

const updateEvents = async (id, data, userId) => {
  return await Events.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: data },
    { new: true }
  );
};

const deleteEvents = async (id, userId) => {
  return await Events.findOneAndDelete({ _id: id, createdBy: userId });
};

module.exports = {
  createEvents,
  getAllEvents,
  getEventsById,
  getUserEvents,
  getUserEventsById,
  updateEvents,
  deleteEvents,
};