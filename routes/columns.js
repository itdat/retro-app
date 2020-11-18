const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Card = require("../models/Card");
const Column = require("../models/Column");
const mongoose = require("mongoose");

// @route   GET /api/boards/:boardId/columns/:name
// @desc    Get ordered card Ids
// @access  Private
router.get("/:name", async (req, res) => {
  try {
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.body.boardId);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: "Board not found" });
    }
    const column = await Column.findOne({
      board: boardId,
      name: req.params.name,
    });
    if (!column) {
      const initColumn = new Column({
        board: boardId,
        name: req.params.name,
        list: [],
      });
      await initColumn.save();
      return res.json([]);
    }
    return res.json(column.list);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   GET /api/boards/:boardId/columns/:name/:index?srcId&srcColumn
// @desc    Move card srcId to destName column at destIndex
// @access  Private
router.get("/:name/:index", auth, async (req, res) => {
  if (!req.query.srcId) {
    return res.status(400).json({ msg: "Card Id not found" });
  }

  try {
    // Check if board is valid
    let boardId;
    try {
      boardId = mongoose.Types.ObjectId(req.body.boardId);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: "Board not found" });
    }

    // Check if source card is valid
    const card = await Card.findOne({ board: boardId, _id: req.query.srcId });
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    const srcColumn = await Column.findOne({
      board: boardId,
      name: req.query.srcColumn,
    });

    const desColumn = await Column.findOne({
      board: boardId,
      name: req.params.name,
    });

    if (!desColumn || !srcColumn) {
      return res.status(400).json({ msg: "Invalid column" });
    }
    if (req.params.index < 0) {
      return res.status(400).json({ msg: "Invalid index" });
    }

    // Remove id from srcColumn
    const srcIds = srcColumn.list.filter(
      (id) => String(id) != String(req.query.srcId)
    );
    await Column.findByIdAndUpdate(
      srcColumn._id,
      { $set: { list: srcIds } },
      { new: true }
    );

    // Change column
    await Card.findByIdAndUpdate(
      req.query.srcId,
      { $set: { column: req.params.name } },
      { new: true }
    );

    let desIds =
      srcColumn.name === desColumn.name ? [...srcIds] : [...desColumn.list];
    desIds.splice(
      parseInt(req.params.index),
      0,
      mongoose.Types.ObjectId(req.query.srcId)
    );

    await Column.findByIdAndUpdate(
      desColumn._id,
      { $set: { list: desIds } },
      { new: true }
    );

    if (srcColumn.name === desColumn.name) {
      res.json({
        destination: {
          name: desColumn.name + "Order",
          list: desIds,
        },
      });
    } else {
      res.json({
        source: {
          name: srcColumn.name + "Order",
          list: srcIds,
        },
        destination: {
          name: desColumn.name + "Order",
          list: desIds,
        },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
