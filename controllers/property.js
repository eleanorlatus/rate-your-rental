const Review = require("../models/Review.js");
const Property = require("../models/Property.js");
const User = require("../models/User.js");

module.exports = {
    getProperty: async (req, res) => {
        try {
        const property = await Property.findById(req.params.id);
        console.log(property._id)
        const review = await Review.find({ propertyId: req.params.id}).sort({ createdAt: "desc" }).lean();
        res.render("property.ejs", { property: property, review: review});
        console.log(user)
        } catch (err) {
          console.log(err);
        }
      },
  };