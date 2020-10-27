const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("card", CardSchema);
