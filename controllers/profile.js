const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");

module.exports = {
    getProfile: async (req, res) => {
        try {
          const reviews = await Review.find({ user: req.user.id });
          res.render("profile.ejs", { review: reviews, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
      deleteReview: async (req, res) => {
        try {
          let review = await Review.findById({ _id: req.params.id });
          if(review.cloudinaryId != ""){
            await cloudinary.uploader.destroy(review.cloudinaryId);
          }
          await Review.remove({ _id: req.params.id });
          res.redirect("/profile");
        } catch (err) {
          res.redirect("/");
        }
      },
  };
