const express = require("express");
const router = express.Router();
const { getDeveloperAndAreaDetails } = require("../controllers/info.controller");

// ✅ POST method (you can use GET with query params if preferred)
router.post("/details", getDeveloperAndAreaDetails);

module.exports = router;
