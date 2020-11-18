const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Card = require("../models/Card");
const auth = require("../middleware/auth");
const Board = require("../models/Board");
const Column = require("../models/Column");
const mongoose = require("mongoose");
const { db } = require("../models/Card");

// @route   GET /api/boards/:boardId/cards/
// @desc    Get all cards in specific board
// @access  Private
router.get("/", async (req, res) => {
  try {
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.body.boardId);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ msg: "Board id is not valid" });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }
    const cards = await Card.find({ board: boardId });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/boards/:boardId/cards
// @desc    Add a new card to cards and add card id to the specific column
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
    ],
  ],
  async (req, res) => {
    // Assert for column and content
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { content, column } = req.body;
    // Assert for boardId
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.body.boardId);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ msg: "Board id is not valid" });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }
    // Add new card
    try {
      const newCard = new Card({
        board: boardId,
        content,
        user: req.user.id,
      });
      const card = await newCard.save();

      // Init column
      try {
        const isExist = await Column.exists({});
        if (!isExist) {
          const newColumn = new Column({
            board: boardId,
            name: column,
            list: [card._id],
          });
          await newColumn.save();
        } else {
          let found = await Column.findOne({ board: boardId, name: column });
          if (!found) {
            const newColumn = new Column({
              board: boardId,
              name: column,
              list: [card._id],
            });
            await newColumn.save();
          } else {
            await Column.findByIdAndUpdate(
              found._id,
              { $push: { list: { $each: [card._id], $position: 0 } } },
              { new: true }
            );
          }
        }
      } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
      }
      res.json(card);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   PUT /api/boards/:boardId/cards/:id
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

// @route   DELETE api/cards/:id?board=...
// @desc    Delete card
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  // Assert for boardId
  let boardId;
  try {
    boardId = mongoose.Types.ObjectId(req.body.boardId);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ msg: "Board id is not valid" });
  }
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ msg: "Board not found" });
  }

  // Assert for cardId
  try {
    let cardId;
    try {
      cardId = mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: "Card not found" });
    }
    let card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ msg: "Card not found" });
    // Delete card by cardId
    await Card.findByIdAndRemove(cardId);

    // Get all columns of boardId
    const columns = await Column.find({ board: boardId });
    // Delete id in columns
    await (async () => {
      for (const column of columns) {
        const updatedList = column.list.filter((id) => id != cardId);
        await Column.findByIdAndUpdate(
          column._id,
          { $set: { list: updatedList } },
          { new: true }
        );
      }
    })();
    res.json({ msg: "Card removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
