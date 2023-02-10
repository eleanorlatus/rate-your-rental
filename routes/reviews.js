const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const reviewController = require("../controllers/review");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/", ensureAuth, reviewController.getReviewPage);

router.post("/createReview",  upload.single("file"), reviewController.createReview);

module.exports = router;
