require("dotenv").config();

const mongoose = require("mongoose");
const config = require("config");
const db = config
  .get("mongoURI")
  .replace("<username>", process.env.MONGOBD_USER)
  .replace("<password>", process.env.MONGODB_PASSWORD)
  .replace("<dbname>", process.env.MONGODB_DATABASE_NAME);

console.log(db);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
