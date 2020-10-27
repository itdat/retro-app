const express = require("express");
const router = express.Router();

// @route   POST /api/cards/:idCard/comments/:idComment/votes
// @desc    Vote a comment
// @access  Private
router.post("/", (req, res) => {
  res.send("Vote a comment");
});

// @route   DELETE /api/cards/:idCard/comments/:idComment/votes
// @desc    Unvote a comment
// @access  Private
router.delete("/", (req, res) => {
  res.send("Unvote a comment");
});

module.exports = router;
