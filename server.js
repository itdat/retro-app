const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Retrospective API..." });
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/boards", require("./routes/boards"));
app.use("/api/cards", require("./routes/cards"));
app.use("/api/votes", require("./routes/votes"));
app.use("/api/comments/:id/votes", require("./routes/comments-votes"));
app.use("/api/comments", require("./routes/comments"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
