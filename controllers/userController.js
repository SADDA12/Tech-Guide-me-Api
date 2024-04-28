const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      password,
      role,
      availability_start,
      availability_end,
      position,
      company,
      skills,
      description,
      rateHour,
    } = req.body;
    const user = new User({
      username,
      name,
      email,
      password,
      role,
      availability_start,
      availability_end,
      position,
      company,
      skills,
      description,
      rateHour,
    });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const responseData = {
      message: "Login successful",
      name: user.username,
      email: user.email,
      token: token,
      role: user.role,
    };

    if (user.role === "mentor") {
      responseData.position = user.position;
      responseData.company = user.company;
      responseData.skills = user.skills;
      responseData.description = user.description;
      responseData.rateHour = user.rateHour;
    }
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Logout user (handled client-side by removing the token)
exports.logoutUser = async (req, res) => {
  res.json({ message: "Logout successful" });
};
// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Set availability for a mentor
exports.setAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const mentor = await User.findOneAndUpdate(
      { _id: req.params.id, role: "mentor" },
      { $set: { availability } },
      { new: true }
    );
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    res.json({
      message: "Availability updated",
      availability: mentor.availability,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
