const faqService = require("../services/Faq.service");

// Create
const createFaq = async (req, res) => {
  try {
    const faq = await faqService.createFaq(req.body, req.user.id);
    res.status(201).json(faq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// My Faqs
const getMyFaqs = async (req, res) => {
  try {
    const faqs = await faqService.getMyFaqs(req.user.id);
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by Id
const getFaqById = async (req, res) => {
  try {
    const faq = await faqService.getFaqById(req.params.id, req.user.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
const updateFaq = async (req, res) => {
  try {
    const faq = await faqService.updateFaq(req.params.id, req.body, req.user.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json(faq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
const deleteFaq = async (req, res) => {
  try {
    const faq = await faqService.deleteFaq(req.params.id, req.user.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public
const getPublicFaqs = async (req, res) => {
  try {
    const faqs = await faqService.getPublicFaqs();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFaq,
  getMyFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  getPublicFaqs,
};
