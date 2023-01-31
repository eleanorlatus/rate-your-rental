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
          title: req.body.title,
          reviewBody: req.body.reviewBody,
          propertyAddress: req.body.address,
          tenancyStart: req.body.tenancyStart,
          tenancyEnd: req.body.tenancyEnd,
        });
        console.log("Post has been added!");
        res.redirect("/reviews");
      } catch (err) {
        console.log(err);
      }
    },
  };