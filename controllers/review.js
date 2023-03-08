const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const property = await Property.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", {property: property, loggedInUser: req.user});
      console.log(property[0].images)
    } catch (err) {
      console.log(err);
    }
  },
  getReviewPage: async (req, res) => {
        try {
          res.render("reviews.ejs", { loggedInUser: req.user});
        } catch (err) {
          console.log(err);
        }
      },
  createReview: async (req, res) => {
      try {
        const streetName = req.body.streetName.split(" ").map((x)=>x[0].toUpperCase() + x.slice(1)).join(" ")
        const postcode = req.body.postcode.toUpperCase()
          // check if property already exists in the DB, if not then create one
          let property = await Property.find({ postcode: postcode, streetName: streetName});
          if(property.length == 0){
            await Property.create({
              streetName: streetName,
              postcode: postcode
            });
          }
          property = await Property.find({ postcode: postcode, streetName: streetName});
          console.log(property)
    
        //create the review
        const newReview = await Review.create({
            user: req.user.id,
            propertyId: property[0]._id,
            streetName: streetName,
            postcode: postcode,
            tenancyFrom: req.body.tenancyFrom.split("-").reverse().join("/"),
            tenancyTo: req.body.tenancyTo.split("-").reverse().join("/"),
            title: req.body.title,
            body: req.body.body,
            image: "",
            cloudinaryId: "",
          });

          //add review to property
          await Property.findOneAndUpdate(
            { _id: property[0]._id },
            { $push: { reviews: newReview.id } },
          );

         // If an image has been uploaded by the user, add the image to the review and corresponding property
        if(req.file !== undefined){
          const result = await cloudinary.uploader.upload(req.file.path);
          await Property.findOneAndUpdate(
            { _id: property[0]._id },
            {
              $push:   { images: {
              reviewId: newReview.id,
              url: result.secure_url,
              cloudinaryId: result.public_id,
              }}
            }
          )
          await Review.findOneAndUpdate(
            { _id: newReview.id },
            { $set: {
              image: result.secure_url,
              cloudinaryId: result.public_id,
              }},
          );
         }
        
        console.log("Review has been added!");
        res.redirect(`/property/${property[0].id}`);
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
        // update property document
        await Property.updateOne({_id: review.propertyId}, { $pull: { images: { reviewId: req.params.id }} });
        await Property.updateOne({_id: review.propertyId}, { $pull: { reviews: req.params.id } });
        const property = await Property.findById({ _id: review.propertyId });
        // if a property no longer holds a review, delete said property
        if(property.reviews.length == 0){
          await Property.deleteOne({ _id: review.propertyId });
          res.redirect(`/profile/${req.user.id}`);
        } else{
          res.redirect(`/property/${property.id}`);
        }
      } catch (err) {
        res.redirect("/");
      }
    },
  };