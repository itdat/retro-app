const mongoose = require("mongoose");

const ColumnSchema = mongoose.Schema({
  board: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "boards",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#009688",
  },
});

module.exports = mongoose.model("column", ColumnSchema);
