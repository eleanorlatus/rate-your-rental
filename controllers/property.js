const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
    getProperty: async (req, res) => {
        try {
        const property = await Property.findById(req.params.id);
        const review = await Review.find({ propertyId: req.params.id}).populate("user").sort({ createdAt: "desc" }).lean();
        res.render("property.ejs", { property: property, review: review, user: req.user});
        } catch (err) {
          console.log(err);
        }
      },
      deleteReview: async (req, res) => {
        try {
          let review = await Review.findById({ _id: req.params.id });
          const property = await Property.findById({ _id: review.propertyId });
          if(review.cloudinaryId != ""){
            await cloudinary.uploader.destroy(review.cloudinaryId);
          }
          await Review.remove({ _id: req.params.id });
          res.redirect(`/property/${property.id}`);
        } catch (err) {
          res.redirect("/");
        }
      },
  };