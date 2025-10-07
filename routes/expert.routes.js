const express = require("express");
const router = express.Router();
const expertController = require("../controllers/expert.controller");

router.post("/", expertController.createExperts);
router.get("/", expertController.getExperts);

module.exports = router;
