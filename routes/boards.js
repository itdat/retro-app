const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Board = require("../models/Board");
const User = require("../models/User");
const auth = require("../middleware/auth");

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
    console.log(err.message);
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
      return res.status(400).json({ errors: errors.array() });
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
router.put("/:id", (req, res) => {
  res.send("Update board");
});

// @route   DELETE api/boards/:id
// @desc    Delete board
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete board");
});

module.exports = router;
