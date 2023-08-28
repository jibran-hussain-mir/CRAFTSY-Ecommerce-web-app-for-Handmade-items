const User = require("../models/user");
const { errorHandler } = require("../helper/dbErrorHandler");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../controller/user");
require("dotenv").config();
exports.signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;

    res.status(201).json({ user });
  } catch (error) {
    res
      .status(400)
      .json({ /*error:error.message*/ error: [{ msg: error.message }] });
  }
};
exports.sellerSignup = async (req, res) => {
  try {
    const user = new User(req.body);
    user.role = 1;
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;

    res.status(201).json({ user });
  } catch (error) {
    res
      .status(400)
      .json({ /*error:error.message*/ error: [{ msg: error.message }] });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "This Email-ID is not registered with CRAFTSY" });
    }
    // Email should match with the hashed password
    if (!user.isValidCredentials(password)) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "12 days",
    });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });

    const { _id, name, role } = user;
    res.status(200).json({ token, user: { _id, name, email, role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Signout Successfull" });
};

exports.requireSignin = expressjwt({
  secret: () => process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  if (
    !(req.profile && req.auth && req.profile._id.toString() === req.auth._id)
  ) {
    return res.status(403).json({
      error: "Acess denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "You are not admin.Access denied",
    });
  }
  next();
};

exports.resetPasswordPost = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json("User with this email not found");
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const secret = process.env.JWT_SECRET_KEY + user.hashed_password;
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
    message = `<h1>Click on this link to Reset your password</h1><br>${link}`;
    await sendEmail(user.email, "Reset Password Link", message);

    console.log(`This is the link: ${link}`);

    return res.json("We have sent a reset link to this email");
  } catch (e) {
    console.log(e);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    console.log(process.env.JWT_SECRET_KEY);
    const { id, token } = req.params;

    const user = await User.findById(id).exec();
    if (!user) {
      return res.json("No user with this Id found");
    }
    const verify = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY + user.hashed_password
    );
    console.log(verify);
    const plainPassword = req.body.newPassword;
    console.log(`dkkkkkkkkkkjjjj: ${plainPassword}`);
    user.password = plainPassword; // Use the virtual setter
    await user.save();
    return res.json("Password changed successfully");
  } catch (e) {
    console.log(e.message);
    console.log(e.message);
    res.status(400).json({ error: e.message });
  }
};
