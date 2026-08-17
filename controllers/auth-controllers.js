const User = require("../models/user-model");
const signToken = require("../utils/sign-token");

// POST /api/v1/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      // Only allow "admin" role if you explicitly decide to support that at signup.
      // For a safer default, ignore role from the client entirely:
      // role: undefined,
      role,
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

module.exports = {
  signup,
  login,
};
