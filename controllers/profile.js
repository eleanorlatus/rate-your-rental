const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");
const User = require("../models/User.js");

module.exports = {
    getProfile: async (req, res) => {
        try {
          const user = await User.findOne({userName: req.params.username}).lean();
          const reviews = await Review.find({ user: user._id });
          console.log(reviews)
          console.log(user)
          res.render("profile.ejs", { review: reviews, user: user, loggedInUser: req.user });
        } catch (err) {
          console.log(err);
        }
      },
      deleteReview: async (req, res) => {
        try {
          const review = await Review.findById({ _id: req.params.id });
          if(review.cloudinaryId != ""){
            await cloudinary.uploader.destroy(review.cloudinaryId);
          }
          await Review.deleteOne({ _id: req.params.id });
          console.log(review)
          await Property.updateOne({_id: review.propertyId}, { $pull: { images: { reviewId: req.params.id } } });
          res.redirect(`/profile/${req.user.id}`);
        } catch (err) {
          res.redirect("/");
        }
      },
  };
