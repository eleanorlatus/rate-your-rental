const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  streetName:{
    type: String,
    required: true,
  },
  postcode:{
    type: String,
    required: true,
  },
  images:{
    type: Array,
    required: false,
  },
  reviews:{
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
