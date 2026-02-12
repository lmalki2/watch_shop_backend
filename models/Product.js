const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["homme", "femme"],
    required: true
  },
  images: {
    type: [String],
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
