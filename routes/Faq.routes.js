const express = require("express");
const router = express.Router();
const faqController = require("../controllers/Faq.controller");
const verifyToken = require("../middleware/auth");

// 🔓 Public Route
router.get("/public", faqController.getPublicFaqs);

// 🔒 Protected Routes
router.post("/", verifyToken, faqController.createFaq);
router.get("/", verifyToken, faqController.getMyFaqs);
router.get("/:id", verifyToken, faqController.getFaqById);
router.put("/:id", verifyToken, faqController.updateFaq);
router.delete("/:id", verifyToken, faqController.deleteFaq);


module.exports = router;
