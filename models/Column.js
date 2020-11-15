const mongoose = require("mongoose");

const ColumnSchema = mongoose.Schema({
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
