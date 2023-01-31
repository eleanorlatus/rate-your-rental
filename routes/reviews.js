const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/", ensureAuth, reviewController.getReviewPage);

router.post("/createReview", ensureAuth, reviewController.createReview);

module.exports = router;
