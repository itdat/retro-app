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
  list: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("column", ColumnSchema);
