const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
  boardId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "boards",
  },
  column: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("card", CardSchema);
