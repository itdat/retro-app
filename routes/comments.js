const express = require("express");
const router = express.Router();

// @route   GET api/comments
// @desc    Get all comments of a card
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all comments of a card");
});

// @route   POST api/comments
// @desc    Add new comment to a card
// @access  Private
router.post("/", (req, res) => {
  res.send("Add new comment to a card");
});

// @route   PUT api/comments/:id
// @desc    Update comment in a card
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update comment in a card");
});

// @route   DELETE api/comments/:id
// @desc    Delete comment in a card
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete comment in a card");
});

module.exports = router;
