const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
    getProperty: async (req, res) => {
        try {
        const property = await Property.findById(req.params.id);
        console.log(property)
        const reviews = await Review.find({ propertyId: req.params.id}).sort({ createdAt: "desc" }).lean();
        res.render("property.ejs", { property: property, reviews: reviews});
        } catch (err) {
          console.log(err);
        }
      },
  };