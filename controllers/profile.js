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
          
          await cloudinary.uploader.destroy(review.cloudinaryId);
          await Review.deleteOne({ _id: req.params.id });

        // update property document
        await Property.updateOne({_id: review.propertyId}, { $pull: { images: { reviewId: req.params.id }} });
        await Property.updateOne({_id: review.propertyId}, { $pull: { reviews: req.params.id } });
        const property = await Property.findById({ _id: review.propertyId });
        // if a property no longer holds a review, delete said property
        if(property.reviews.length == 0){
          await Property.deleteOne({ _id: review.propertyId });
        }
          res.redirect(`/profile/${req.user.userName}`);
        } catch (err) {
          res.redirect("/");
        }
      },
  };
