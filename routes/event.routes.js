const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/public", eventController.getPublicEvents);
router.get("/public/:id", eventController.getPublicEventsById);

router.post("/", verifyToken, upload.single("image"), eventController.createEvents);
router.get("/", verifyToken, eventController.getUserEvents);
router.get("/:id", verifyToken, eventController.getUserEventsById);
router.put("/:id", verifyToken, upload.single("image"), eventController.updateEvents);
router.delete("/:id", verifyToken, eventController.deleteEvents);

module.exports = router;
