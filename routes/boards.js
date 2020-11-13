const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Board = require("../models/Board");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// @route   GET api/boards
// @desc    Get all users boards
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/boards
// @desc    Add new board
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: "Can't create new board", errors: errors.array() });
    }

    const { name, context } = req.body;
    try {
      const newBoard = new Board({
        user: req.user.id,
        name,
        context,
      });

      const board = await newBoard.save();
      res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/boards/:id
// @desc    Update board
// @access  Private
router.put(
  "/:id",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const { name, context } = req.body;
    const updatedContent = { name, context };
    // if (name) updatedContent.name = name;
    // if (context) updatedContent.context = context;

    try {
      let board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: "Board not found" });
      }
      board = await Board.findByIdAndUpdate(
        req.params.id,
        { $set: updatedContent },
        { new: true }
      );
      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/boards/:id
// @desc    Delete board
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: "Board not found" });
    }
    let board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ msg: "Board not found" });

    await Board.findByIdAndRemove(boardId);
    res.json({ msg: "Board removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
