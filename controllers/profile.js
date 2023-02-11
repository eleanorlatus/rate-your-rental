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
      updateProfilePhoto: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            await User.findOneAndUpdate(
              { _id: req.user.id },
              {
                profilePhoto: result.secure_url,
                cloudinaryId: result.public_id,
              }
            );
            console.log("Successfully changed profile photo")
            res.redirect("/profile");
        } catch (err) {
          console.log(err);
        }
      },
  };
