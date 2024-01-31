const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
    trim: true,
  },
  hoursWorked: {
    type: String,
    required: true,
    trim: true,
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
    default: 1,
    min: 1,
    max: 5,
  },
  locked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("timesheet", timesheetSchema);
