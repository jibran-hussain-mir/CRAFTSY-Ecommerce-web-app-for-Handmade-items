const User = require("../models/user");
const { errorHandler } = require("../helper/dbErrorHandler");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

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
