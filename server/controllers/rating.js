const timesheetModel = require("../models/timesheet");
exports.markRating = async (req, res) => {
  try {
    // console.log("Mark rating req payload - " + JSON.stringify(req.user));
    // console.log("Mark rating token payload - " + JSON.stringify(req.user));
    const { timesheetId, rating } = req.body.formdata;
    await timesheetModel.findOneAndUpdate(
      { _id: timesheetId },
      {
        rating: rating,
      }
    );
    res.status(200).json({
      message: "Rating marked successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Please try again.",
      success: false,
      error: error.message,
    });
  }
};
