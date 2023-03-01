const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/:id", propertyController.getProperty);

router.delete("/deleteReview/:id", propertyController.deleteReview);

module.exports = router;
