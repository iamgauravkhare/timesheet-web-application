const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    // console.log("Sign up req payload - " + JSON.stringify(req.body));
    const { fullname, username, password, accountType } = req.body;

    if (!fullname || !username || !password || !accountType) {
      return res.status(400).json({
        message: "All fields are mandantory to fill!",
        success: false,
      });
    }

    const userExist = await userModel.findOne({ username: username });

    if (userExist) {
      return res.status(400).json({
        message: "User already exist! Please sign in to continue.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const responseData = await userModel.create({
      fullname,
      username,
      password: hashedPassword,
      accountType,
    });

    const token = jwt.sign(
      {
        id: responseData._id,
        username: responseData.username,
        accountType: responseData.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const responsePayload = {
      token,
    };

    res.status(201).json({
      payload: responsePayload,
      success: true,
      message: "Sign up successfull!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error! Please try again.",
      success: false,
      error: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    // console.log("Sign in req payload - " + JSON.stringify(req.body));
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are mandantory to fill!",
        success: false,
      });
    }

    const userExist = await userModel.findOne({ username }).select("+password");

    if (!userExist) {
      return res.status(401).json({
        message: "User does not exist! Please sign up to continue.",
        success: false,
      });
    }

    if (await bcrypt.compare(password, userExist.password)) {
      const token = jwt.sign(
        {
          id: userExist._id,
          username: userExist.username,
          accountType: userExist.accountType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      const responsePayload = {
        token,
      };

      res.status(200).json({
        payload: responsePayload,
        success: true,
        message: "Sign in successfull!",
      });
    } else {
      res.status(401).json({
        message: "Wrong passowrd!",
        success: false,
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
