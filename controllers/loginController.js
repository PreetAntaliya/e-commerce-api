const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const createUser = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password, cpassword } = req.body;

    // Check if email already exists
    const chekEmail = await userModel.findOne({ email: email });
    if (chekEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // Validate other required fields
    if (!name || !email || !password || !cpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for registration.",
      });
    }

    // Check if passwords match
    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Create user
    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User successfully registered.",
      user: newUser,
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

const allUser = async (req, res) => {
  try {
    let Users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "all users finded...",
      Users,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

const login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await userModel.findOne({ email: email });
    if (!user || user.password != password) {
      return res.status(503).send({
        success: false,
        message: "Email and password not valid",
      });
    }
    let token = jwt.sign({ payload: user }, "abc", { expiresIn: "1hr" });
    return res.status(200).send({
      success: true,
      message: "Token is here",
      token,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const changePassword = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    if (password === cpassword) {
      let user = await userModel.findOneAndUpdate(
        { email: email },
        {
          password,
        }
      );
      return res.status(200).send({
        success: true,
        message: "password updated",
      });
    }
    return res.status(200).send({
      success: false,
      message: "password and confirm password not same",
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  createUser,
  allUser,
  login,
  changePassword,
};
