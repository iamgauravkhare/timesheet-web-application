const mongoose = require("mongoose");

exports.databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(console.log("Database connection established successfully 😉..."))
    .catch((err) => {
      console.log("Database connection failed 🥲...");
    });
};
