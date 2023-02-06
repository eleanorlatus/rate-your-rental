const Review = require("../models/Review.js");

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
        await Review.create({
            user: req.user.id,
            propertyAddress: req.body.address,
            title: req.body.title,
            reviewBody: req.body.body,
            tenancyFrom: req.body.tenancyFrom,
            tenancyTo: req.body.tenancyTo
          });
        console.log("Review has been added!");
        console.log(req.body);
        res.redirect("/reviews");
      } catch (err) {
        console.log(err);
      }
    },
  };