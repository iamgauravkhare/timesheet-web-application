const jwt = require("jsonwebtoken");

exports.isAuthencated = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token;
    // console.log(
    //   "Middleware - " + token
    //     ? JSON.stringify(token)
    //     : "Token not found! Please sign in again to continue."
    // );
    if (!token) {
      return res.status(401).json({
        message: "Token not found! Please sign in again to continue.",
        success: false,
      });
    }

    const verifiedTokenData = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedTokenData) {
      return res.status(401).json({
        message: "Token is expired! Please sign in again to continue.",
        success: false,
      });
    }
    // console.log("Middleware token data - " + JSON.stringify(verifiedTokenData));
    req.user = verifiedTokenData;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Please sign in again to continue.",
      success: false,
      error: error.message,
    });
  }
};

exports.isManager = async (req, res, next) => {
  try {
    // console.log("Middleware - " + req.user.accountType);
    if (req.user.accountType == "Manager") {
      next();
    } else {
      res.status(401).json({
        message: "Something went wrong user account type cannot verified!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Please sign in again to continue.",
      success: false,
      error: error.message,
    });
  }
};

exports.isEmployee = async (req, res, next) => {
  try {
    // console.log("Middleware - " + req.user.accountType);
    if (req.user.accountType == "Employee") {
      next();
    } else {
      res.status(401).json({
        message: "Something went wrong user account type cannot verified!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Please sign in again to continue.",
      success: false,
      error: error.message,
    });
  }
};
