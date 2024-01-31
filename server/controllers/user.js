const userModel = require("../models/user");
const timesheetModel = require("../models/timesheet");
exports.userData = async (req, res) => {
  try {
    // console.log("User data token payload - " + JSON.stringify(req.user));

    if (req.user.accountType === "Employee") {
      const responsePayload = await userModel
        .findOne({ _id: req.user.id })
        .populate({
          path: "timesheets",
          populate: {
            path: "manager",
          },
        });

      return res.status(200).json({
        payload: responsePayload,
        success: true,
      });
    } else {
      const userPayload = await userModel.findOne({
        _id: req.user.id,
      });

      const timesheetPayload = await timesheetModel
        .find({
          manager: req.user.id,
        })
        .populate("employee")
        .populate("manager");

      const responsePayload = { ...userPayload.toObject(), timesheetPayload };

      return res.status(200).json({
        payload: responsePayload,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Please try again.",
      success: false,
      error: error.message,
    });
  }
};

exports.managersList = async (req, res) => {
  try {
    const responseData = await userModel.find({ accountType: "Manager" });
    const responsePayload =
      responseData.length > 0
        ? responseData.map((e, i) => {
            return { _id: e._id, fullname: e.fullname };
          })
        : [];
    res.status(200).json({
      payload: responsePayload,
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
