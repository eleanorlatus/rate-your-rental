const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
//   propertyId: {
//     //type: mongoose.Schema.Types.ObjectId,
//     type: Number,
//     ref: "Property",
//   },
  title: {
    type: String,
    required: true,
  },
  reviewBody: {
    type: String,
    required: true,
  },
//   image: {
//     type: String,
//     require: false,
//   },
//   cloudinaryId: {
//     type: String,
//     require: false,
//   },
  tenancyDuration: {
    type: Date,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
