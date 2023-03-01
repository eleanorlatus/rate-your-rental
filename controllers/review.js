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
        const streetName = req.body.streetName.split(" ").map((x)=>x[0].toUpperCase() + x.slice(1)).join(" ")
        const postcode = req.body.postcode.toUpperCase()

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

          let result = ""
          // If an image has been uploaded by the user, upload the image to cloudinary
        if(req.file !== undefined){
         result = await cloudinary.uploader.upload(req.file.path);
        }else{
          result=
          {
            secure_url: "",
            public_id: ""
          }
        }
          await Review.create({
            user: req.user.id,
            propertyId: property[0]._id,
            streetName: streetName,
            postcode: postcode,
            tenancyFrom: req.body.tenancyFrom.split("-").reverse().join("/"),
            tenancyTo: req.body.tenancyTo.split("-").reverse().join("/"),
            title: req.body.title,
            body: req.body.body,
            image: result.secure_url,
            cloudinaryId: result.public_id,
          });
        console.log("Review has been added!");
        res.redirect(`/property/${property[0].id}`);
      } catch (err) {
        console.log(err);
      }
    },
    deleteReview: async (req, res) => {
      try {
        let review = await Review.findById({ _id: req.params.id });
        await cloudinary.uploader.destroy(review.cloudinaryId);
        await Review.remove({ _id: req.params.id });
        console.log(review);
        res.redirect("/profile");
      } catch (err) {
        res.redirect("/");
      }
    },
  };