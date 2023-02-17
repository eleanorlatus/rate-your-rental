const express = require("express");
const router = express.Router();
const editProfileController = require("../controllers/editProfile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/", editProfileController.getPage);

module.exports = router;
