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
    return res
      .status(400)
      .json({ msg: "Cannot load data because wrong format URL" });
  }
  try {
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.query.board);
    } catch (err) {
      console.error(err.message);
      return res
        .status(400)
        .json({ msg: "Cannot load data because board id is not valid" });
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
      try {
        const foundBoard = await Board.findOne({
          _id: mongoose.Types.ObjectId(board),
        });
        if (!foundBoard) {
          return res
            .status(400)
            .json({ msg: "Cannot add card because board id not found" });
        }
      } catch (err) {
        return res
          .status(400)
          .json({ msg: "Cannot add card because board id not found" });
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

// @route   PUT api/cards/:id
// @desc    Update card
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { content } = req.body;
  const updatedContent = {};
  if (content) updatedContent.content = content;

  try {
    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    card = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: updatedContent },
      { new: true }
    );
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/cards/:id
// @desc    Delete card
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let cardId;
    try {
      cardId = mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ msg: "Bad request" });
    }

    let card = await Card.findById(cardId);

    if (!card) return res.status(404).json({ msg: "Card not found" });

    // if (card.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not authorized" });
    // }

    await Card.findByIdAndRemove(cardId);
    res.json({ msg: "Card removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
