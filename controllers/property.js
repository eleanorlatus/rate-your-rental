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
        const property = await Property.find({postcode : req.query.postcode.toUpperCase()})
        if(property.length == 0){
          const validationErrors = [];
          validationErrors.push({ msg: "No properties found" });
          req.flash("errors", validationErrors);
        }
        const review = await Review.find({ propertyId: property._id}).populate("user").sort({ tenancyFrom: "desc" }).lean();
        res.render("searchResults.ejs", {property: property, review: review, loggedInUser: req.user});
        } catch (err) {
          console.log(err);
        }
      },
  };