const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  context: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("board", BoardSchema);
