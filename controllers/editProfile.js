const Review = require("../models/Review.js");
const Property = require("../models/Property.js");
const User = require("../models/User.js");

module.exports = {
    getPage: async (req, res) => {
        try {
        res.render("edit.ejs", {user: req.user});
        console.log(req.user)
        } catch (err) {
          console.log(err);
        }
      },
  };