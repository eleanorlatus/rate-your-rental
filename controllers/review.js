const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
    getReviewPage: async (req, res) => {
        try {
          res.render("reviews.ejs");
        } catch (err) {
          console.log(err);
        }
      },
    createReview: async (req, res) => {
      try {
        // check if property already exists in the DB, if not then create one
          let property = await Property.find({ postcode: req.body.postcode, streetName: req.body.streetName});
          if(property.length == 0){
            await Property.create({
              streetName: req.body.streetName,
              postcode: req.body.postcode
            });
            console.log("No existing property found, creating new one")
          }
          property = await Property.find({ postcode: req.body.postcode, streetName: req.body.streetName});
          console.log(property)

          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
          console.log(result)
          await Review.create({
            user: req.user.id,
            propertyId: property[0]._id,
            streetName: req.body.streetName,
            postcode: req.body.postcode,
            tenancyFrom: req.body.tenancyFrom,
            tenancyTo: req.body.tenancyTo,
            title: req.body.title,
            body: req.body.body,
            image: result.secure_url,
            cloudinaryId: result.public_id,
          });
        console.log("Review has been added!");
        res.redirect("/reviews");
      } catch (err) {
        console.log(err);
      }
    },
  };