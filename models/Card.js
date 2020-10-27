const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  votes: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
});

const CardSchema = mongoose.Schema({
  column: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "columns",
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
    refer: "users",
  },
  votes: {
    type: [voteSchema],
    default: [],
  },
});

module.exports = mongoose.model("card", CardSchema);
