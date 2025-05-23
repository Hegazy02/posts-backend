const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { signUpSchema, signInSchema } = require("../validators/auth");
const AppError = require("../utils/appError");
const signUp = async (req, res, next) => {
  try {
    // Validate input
    const { error } = signUpSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const { name, password, email } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      password: hashPassword,
      email,
    });

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // Send response without password
    const { password: _p, ...userData } = user.toObject();
    res.status(201).json({ token, user: userData });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    // Validate input
    const { error } = signInSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      // expiresIn: "1d",
    });

    // Send response without password
    const { password: _p, ...userData } = user.toObject();
    res.status(200).json({ token, user: userData });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
