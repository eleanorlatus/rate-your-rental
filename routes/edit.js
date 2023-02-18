const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const editProfileController = require("../controllers/editProfile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/", ensureAuth, editProfileController.getPage);

router.post("/editProfile", upload.single("file"), editProfileController.editProfile);

module.exports = router;
