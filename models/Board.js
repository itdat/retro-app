const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
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
