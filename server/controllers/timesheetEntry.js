const timesheetModel = require("../models/timesheet");
const userModel = require("../models/user");
exports.createEntry = async (req, res) => {
  try {
    // console.log("Create entry req payload - " + JSON.stringify(req.body));
    // console.log("Create entry token payload - " + JSON.stringify(req.user));
    const { hoursWorked, startTime, endTime, manager, date } =
      req.body.formdata;

    if (!hoursWorked || !startTime || !endTime || !manager) {
      return res.status(400).json({
        message: "All fields are mandantory to fill!",
        success: false,
      });
    }

    const employeeData = await userModel.findOne({ _id: req.user.id });

    const currentDateTimeSheetAlreadyExist = await timesheetModel.findOne({
      employee: req.user.id,
      date: date,
    });

    if (currentDateTimeSheetAlreadyExist) {
      return res.status(400).json({
        message: "Your timesheet entry for today is already marked!",
        success: false,
      });
    }

    const responsePayload = await timesheetModel.create({
      hoursWorked,
      date,
      startTime,
      endTime,
      manager,
      employee: employeeData._id,
    });

    employeeData.timesheets.push(responsePayload._id);
    await employeeData.save();

    res.status(201).json({
      message: "Entry created Successfully",
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
