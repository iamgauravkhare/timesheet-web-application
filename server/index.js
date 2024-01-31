const express = require("express");
const app = express();
const cors = require("cors");
// const logger = require("morgan");
require("dotenv").config();
const { databaseConnection } = require("./config/database");
const routes = require("./routes/routes");

const PORT = process.env.PORT || 5500;

databaseConnection();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credential: true,
  })
);
// app.use(logger("tiny"));
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .json({ messsage: "Server is up & running 😉...", success: true });
  } catch (error) {
    res.status(500).json({
      messsage: "Internal server error!",
      success: false,
      error: error.messsage,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server connection established successfully 😉... and running at http://localhost:${PORT}`
  );
});
