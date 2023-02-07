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
          let property = await Property.find({ postcode: req.body.postcode, streetName: req.body.streetName});
          
          if(property.length == 0){
            await Property.create({
              streetName: req.body.streetName.toLowerCase(),
              postcode: req.body.postcode.toLowerCase()
            });
            console.log("No existing property found, creating new one")
          }
          property = await Property.find({ postcode: req.body.postcode, streetName: req.body.streetName});
          console.log(property)
          await Review.create({
            user: req.user.id,
            propertyId: property[0]._id,
            streetName: req.body.streetName.toLowerCase(),
            postcode: req.body.postcode.toLowerCase(),
            title: req.body.title,
            reviewBody: req.body.body,
            tenancyFrom: req.body.tenancyFrom,
            tenancyTo: req.body.tenancyTo
          });
        console.log("Review has been added!");
        res.redirect("/reviews");
      } catch (err) {
        console.log(err);
      }
    },
  };