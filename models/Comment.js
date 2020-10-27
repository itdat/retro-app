const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  votes: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
});

const CommentSchema = mongoose.Schema({
  card: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "cards",
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

module.exports = mongoose.model("comment", CommentSchema);
