const express = require("express");
const router = express.Router();

// @route   POST api/cards/:idCard/votes
// @desc    Vote a card
// @access  Private
router.post("/", (req, res) => {
  res.send("Vote a card");
});

// @route   DELETE api/cards/:idCard/votes
// @desc    Unvote a card
// @access  Private
router.delete("/", (req, res) => {
  res.send("Unvote a card");
});

module.exports = router;
