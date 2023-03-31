const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const reviewController = require("../controllers/review");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/", ensureAuth, reviewController.getReviewPage);

router.get("/:streetName/:postcode", ensureAuth, reviewController.getReviewPageFromProperty);

router.post("/createReview",  upload.single("file"), reviewController.createReview);

router.delete("/deleteReview/:id", reviewController.deleteReview);

module.exports = router;
