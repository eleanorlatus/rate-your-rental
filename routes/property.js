const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/property");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/:id", reviewController.getProperty);
//router.get("/:id", ensureAuth, reviewController.getProperty);

module.exports = router;
