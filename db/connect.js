const mongoose = require("mongoose");
const mongourl =
  process.env.MONGO_URI || "mongodb://localhost:27017/funding-firm";

const connectDb = () => {
  const db = mongoose.connection;
  mongoose.connect(mongourl);
  db.once("open", () => {
    console.log("connected to the Database");
  });
  db.on("error", console.error.bind(console, "connection error:"));
};

module.exports = connectDb;
