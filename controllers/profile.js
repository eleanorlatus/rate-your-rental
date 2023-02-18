const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const User = require("../models/User.js");

module.exports = {
    getProfile: async (req, res) => {
        try {
          const reviews = await Review.find({ user: req.user.id });
          res.render("profile.ejs", { review: reviews, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
  };
