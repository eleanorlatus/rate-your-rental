const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
    getProperty: async (req, res) => {
        try {
        const property = await Property.findById(req.params.id);
        const review = await Review.find({ propertyId: req.params.id}).populate("user").sort({ tenancyFrom: "desc" }).lean();
        res.render("property.ejs", { property: property, review: review, loggedInUser: req.user});
        } catch (err) {
          console.log(err);
        }
      },
      searchProperty: async (req, res) => {
        try {
        console.log(req.query)
        const property = await Property.findOne({streetName : req.query.property})
        const review = await Review.find({ propertyId: property._id}).populate("user").sort({ tenancyFrom: "desc" }).lean();
        console.log(property)
        res.render("property.ejs", { property: property, review: review, loggedInUser: req.user});
        } catch (err) {
          console.log(err);
        }
      },
  };