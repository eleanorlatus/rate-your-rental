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
        /*await Review.create({            
            likes: 0,
            user: req.user.id,
            // propertyId: 0,
            title: req.body.title,
            reviewBody: req.body.reviewBody,
            tenancyDuration: req.body.tenancyDuration

          });*/
        console.log("Review has been added!");
        console.log(req.body);
        res.redirect("/reviews");
      } catch (err) {
        console.log(err);
      }
    },
  };