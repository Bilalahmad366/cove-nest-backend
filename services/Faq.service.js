const Faq = require("../models/Faq.model");

// Create
const createFaq = async (data, userId) => {
  return await Faq.create({ ...data, createdBy: userId });
};

// My Faqs
const getMyFaqs = async (userId) => {
  return await Faq.find({ createdBy: userId }).sort({ createdAt: -1 });
};

// Get by Id
const getFaqById = async (id, userId) => {
  return await Faq.findOne({ _id: id, createdBy: userId });
};

// Update
const updateFaq = async (id, data, userId) => {
  return await Faq.findOneAndUpdate(
    { _id: id, createdBy: userId },
    data,
    { new: true }
  );
};

// Delete
const deleteFaq = async (id, userId) => {
  return await Faq.findOneAndDelete({ _id: id, createdBy: userId });
};

// Public
const getPublicFaqs = async () => {
  return await Faq.find().sort({ createdAt: -1 });
};

module.exports = {
  createFaq,
  getMyFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  getPublicFaqs,
};
