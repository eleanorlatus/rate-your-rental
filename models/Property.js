const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
