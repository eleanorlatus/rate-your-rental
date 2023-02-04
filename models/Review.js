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
  tenancyFrom: {
    type: String,
    require: true,
  },
  tenancyTo: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
