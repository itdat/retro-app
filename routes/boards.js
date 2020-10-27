const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   GET api/boards
// @desc    Get all users boards
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all boards");
});

// @route   POST api/boards
// @desc    Add new board
// @access  Private
router.post("/", (req, res) => {
  res.send("Add new board");
});

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
