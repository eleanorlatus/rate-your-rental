const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // propertyId: {
  //   //type: mongoose.Schema.Types.ObjectId,
  //   type: Number,
  //   ref: "Property",
  // },
  propertyAddress:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reviewBody: {
    type: String,
    required: true,
  },
  tenancyStart: {
    type: String,
    require: true,
  },
  tenancyEnd: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);