const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review.js");
const Property = require("../models/Property.js");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const property = await Property.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", {property: property, user: req.user});
      console.log(property)
    } catch (err) {
      console.log(err);
    }
  },
  getReviewPage: async (req, res) => {
        try {
          res.render("reviews.ejs", { user: req.user});
        } catch (err) {
          console.log(err);
        }
      },
    createReview: async (req, res) => {
      try {
        const streetName = req.body.streetName.split(" ").map((x)=>x[0].toUpperCase() + x.slice(1)).join(" ")
        const postcode = req.body.postcode.toUpperCase()
          // check if property already exists in the DB, if not then create one
          let property = await Property.find({ postcode: postcode, streetName: streetName});
          if(property.length == 0){
            await Property.create({
              streetName: streetName,
              postcode: postcode
            });
          }
          property = await Property.find({ postcode: postcode, streetName: streetName});
          console.log(property)
          let result = ""
        // If an image has been uploaded by the user, upload the image to cloudinary
        if(req.file !== undefined){
         result = await cloudinary.uploader.upload(req.file.path);
         //add review to property
        await Property.findOneAndUpdate(
          { _id: property[0]._id },
          {
            $push:   { images: result.secure_url} 
          },
        );
        }else{
          result=
          {
            secure_url: "",
            public_id: ""
          }
        }
        //create the review
        const newReview = await Review.create({
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
        const property = await Property.findById({ _id: review.propertyId });
        if(review.cloudinaryId != ""){
          await cloudinary.uploader.destroy(review.cloudinaryId);
        }
        await Review.remove({ _id: req.params.id });
        res.redirect(`/property/${property.id}`);
      } catch (err) {
        res.redirect("/");
      }
    },
  };