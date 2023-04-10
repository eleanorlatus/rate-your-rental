const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");
const User = require("../models/User.js");

module.exports = {
    getProfile: async (req, res) => {
        try {
          const user = await User.findOne({userName: req.params.userName}).lean();
          const reviews = await Review.find({ user: user._id });
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

      getEditProfile: async (req, res) => {
        try {
        res.render("edit.ejs", {loggedInUser: req.user});
        } catch (err) {
          console.log(err);
        }
      },
      
      editProfile: async (req, res) => {
        try {
          // update profile photo
          if(req.file !== undefined){
            const result = await cloudinary.uploader.upload(req.file.path);
            await User.findOneAndUpdate(
              { _id: req.user.id },
              {
                profilePhoto: result.secure_url,
                cloudinaryId: result.public_id,
              }
            );
            console.log("Successfully changed profile photo")
          }
          // update username
          let userName = req.user.userName
          if(req.body.userName != ""){
            await User.findOneAndUpdate(
              { _id: req.user.id },
              { userName: req.body.userName }
            );
            userName = req.body.userName
            console.log("Successfully changed username")
          }
          console.log(userName)
          // update email
          if(req.body.email != ""){
            await User.findOneAndUpdate(
              { _id: req.user.id },
              {
                email: req.body.email
              }
            );
            console.log("Successfully changed email")
          }
          res.redirect(`/profile/${userName}`);
        } catch (err) {
          console.log(err);
        }
      },
      deleteProfile: async (req, res) => {
        try {          
          const reviews = await Review.find({ user: req.user._id });
          // loop through and delete each review
          for (const review of reviews){
          await cloudinary.uploader.destroy(review.cloudinaryId);
          await Review.deleteOne({ _id: review.id });

          // update property document
          await Property.updateOne({_id: review.propertyId}, { $pull: { images: { reviewId: review.id }} });
          await Property.updateOne({_id: review.propertyId}, { $pull: { reviews: review.id } });
          const property = await Property.findOne({ _id: review.propertyId });
        
          // if a property no longer holds a review, delete said property
          if(property.reviews.length == 0){
            await Property.deleteOne({ _id: review.propertyId });
          }}

          // delete the user's profile
          await User.deleteOne({ _id: req.user._id });

          console.log(`${req.user.userName}'s profile and all connected reviews have been sucessfully deleted`)
         
          // redirect to homepage
          res.redirect("/");
        } catch (err) {
          res.redirect(`/profile/${req.user.userName}`);
        }
      },
  };
