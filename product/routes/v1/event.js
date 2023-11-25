const express = require("express");
const eventController = require("../../controllers/app-events"); 
const router = express.Router();

// Subscribe to app events
router.use("/app-events", eventController.subscribeEvents);

module.exports = router;
