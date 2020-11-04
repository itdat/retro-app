const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Card = require("../models/Card");
const auth = require("../middleware/auth");
const Board = require("../models/Board");
const mongoose = require("mongoose");

// @route   GET /api/cards?board=...&column=...
// @desc    Get all users cards
// @access  Private
router.get("/", auth, async (req, res) => {
  if (!req.query.board || !req.query.column) {
    return res.status(400).send("Bad request");
  }
  try {
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.query.board);
    } catch (err) {
      console.error(err.message);
      return res.status(400).send("Bad request");
    }
    const cards = await Card.find({
      board: boardId,
      column: req.query.column,
    });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/cards
// @desc    Add new card
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("content", "Content is required").not().isEmpty(),
      check(
        "column",
        "Column consists of wentWell, toImprove or actionItems"
      ).isIn(["wentWell", "toImprove", "actionItems"]),
      check("board", "BoardId is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, column, board } = req.body;
    try {
      const foundBoard = await Board.findOne({
        _id: mongoose.Types.ObjectId(board),
      });
      if (!foundBoard) {
        console.log("Not found");
        return res.status(400).send("Bad request");
      }

      const newCard = new Card({
        board,
        column,
        content,
        user: req.user.id,
      });

      const card = await newCard.save();
      res.json(card);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/cards/:id {boardId, columnId}
// @desc    Update card
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update card");
});

// @route   DELETE api/cards/:id {boardId, columnId}
// @desc    Delete card
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete card");
});

module.exports = router;
