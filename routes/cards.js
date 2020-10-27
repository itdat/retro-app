const express = require("express");
const router = express.Router();

// @route   GET api/cards
// @desc    Get all users cards
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all cards");
});

// @route   GET api/cards/:type
// @desc    Get all users cards in type
// @access  Private
router.get("/:type", (req, res) => {
  res.send("Get all cards in type");
});

// @route   POST api/cards
// @desc    Add new card
// @access  Private
router.post("/", (req, res) => {
  res.send("Add new card");
});

// @route   PUT api/cards/:id
// @desc    Update card
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update card");
});

// @route   PUT api/cards/:id/:type1/:type2
// @desc    Move card
// @access  Private
router.put("/:id/:type1/:type2", (req, res) => {
  res.send("Move card");
});

// @route   DELETE api/cards/:id
// @desc    Delete card
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete card");
});

module.exports = router;
