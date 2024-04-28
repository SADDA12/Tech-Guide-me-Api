const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["mentor", "mentee"] },
  availability_start: { type: String, default: '' },
  availability_end: { type: String, default: '' },
  position: { type: String, default: '' },
  company: { type: String, default: '' },
  skills: [String],
  description: { type: String, default: '' },
  rateHour: { type: Number }
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
