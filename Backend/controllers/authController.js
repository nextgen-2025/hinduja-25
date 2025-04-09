exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// POST /api/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "No user with that email" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Normally you'd send this link via email
    console.log("Reset link:", resetLink);

    return res.json({ message: "Reset link sent", token, resetLink });
  } catch (err) {
    res.status(500).json({ message: "Failed to process request", error: err });
  }
};

// POST /api/reset-password/:token
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token", error: err });
  }
};
