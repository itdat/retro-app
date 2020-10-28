const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Card = require("../models/Card");

// @route   GET /api/cards?boardId=xx&columnId=yy
// @desc    Get all users cards
// @access  Private
router.get("/", async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

// @route   POST api/cards {boardId, columnId}
// @desc    Add new card
// @access  Private
router.post("/", (req, res) => {
  res.send("Add new card");
});

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
