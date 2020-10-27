const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Retrospective API..." });
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use(
  "/api/cards/:idCard/comments/:idComment/votes",
  require("./routes/comments-votes")
);
app.use("/api/cards/:idCard/comments", require("./routes/comments"));
app.use("/api/cards/:idCard/votes", require("./routes/votes"));
app.use("/api/cards", require("./routes/cards"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
