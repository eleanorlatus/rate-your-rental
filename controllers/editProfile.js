const cloudinary = require("../middleware/cloudinary");
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
      editProfile: async (req, res) => {
        try {
          // update profile photo
          if(req.file !== undefined){
            result = await cloudinary.uploader.upload(req.file.path);
            await User.findOneAndUpdate(
              { _id: req.user.id },
              {
                profilePhoto: result.secure_url,
                cloudinaryId: result.public_id,
              }
            );
            console.log("Successfully changed profile photo")
          }
          // update username
          if(req.body.userName != ""){
            await User.findOneAndUpdate(
              { _id: req.user.id },
              {
                userName: req.body.userName
              }
            );
            console.log("Successfully changed username")
          }
          // update email
          if(req.body.email != ""){
            await User.findOneAndUpdate(
              { _id: req.user.id },
              {
                email: req.body.email
              }
            );
            console.log("Successfully changed email")
          }
          console.log(req.body)            
          res.redirect("/profile");
        } catch (err) {
          console.log(err);
        }
      },
  };