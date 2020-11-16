const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const { nextTick } = require("process");

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/boards", require("./routes/boards"));
app.use(
  "/api/boards/:boardId/columns/",
  (req, res, next) => {
    req.body.boardId = req.params.boardId;
    next();
  },
  require("./routes/columns")
);
app.use(
  "/api/boards/:boardId/cards/",
  (req, res, next) => {
    req.body.boardId = req.params.boardId;
    next();
  },
  require("./routes/cards")
);

const PORT = process.env.PORT || 5000;

// Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
