const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  accountType: {
    type: String,
    required: true,
    trim: true,
    enum: ["Manager", "Employee"],
  },
  timesheets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "timesheet",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
