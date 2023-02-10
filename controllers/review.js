const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
    getReviewPage: async (req, res) => {
        try {
          res.render("reviews.ejs", { user: req.user});
        } catch (err) {
          console.log(err);
        }
      },
    createReview: async (req, res) => {
      try {
        // check if property already exists in the DB, if not then create one
        const streetName = req.body.streetName.toLowerCase()
        const postcode = req.body.postcode.toLowerCase()

          let property = await Property.find({ postcode: postcode, streetName: streetName});
          if(property.length == 0){
            await Property.create({
              streetName: streetName,
              postcode: postcode
            });
            console.log("No existing property found, creating new one")
          }else{
              console.log("Property already exists in database, adding review")
            }
          
          property = await Property.find({ postcode: postcode, streetName: streetName});
          console.log(property)

          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
          await Review.create({
            user: req.user.id,
            propertyId: property[0]._id,
            streetName: streetName,
            postcode: postcode,
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