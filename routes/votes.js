const express = require("express");
const router = express.Router();

// @route   POST /api/votes
// @desc    Vote a card
// @access  Private
router.post("/", (req, res) => {
  res.send("Vote a card");
});

// @route   DELETE /api/votes/:id
// @desc    Unvote a card
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Unvote a card");
});

module.exports = router;
