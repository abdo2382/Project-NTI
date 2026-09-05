const User = require("../models/user-model");
const signToken = require("../utils/sign-token");

// POST /api/v1/auth/signup
const signup = async (req, res) => {
  try {
    // Role is intentionally NOT taken from req.body — otherwise anyone could
    // sign up with { "role": "admin" } and grant themselves admin access.
    // New accounts always start as "user"; promote to admin manually in the DB.
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = signToken(newUser._id);

    // Password already excluded from output thanks to `select: false`
    res.status(201).json({
      status: "success",
      message: "Account created successfully",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// POST /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // password has `select: false` on the schema, so we explicitly ask for it here
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    const token = signToken(user._id);
    user.password = undefined; // strip password before sending back

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// GET /api/v1/auth/profile
// Example protected route: only reachable with a valid JWT (see `protect`
// middleware). req.user is attached by that middleware after verifying the token.
const getProfile = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

module.exports = {
  signup,
  login,
  getProfile,
};
