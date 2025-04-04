const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  caste: { type: String },
  education: { type: String },
  annualIncome: { type: Number },
  gender: { type: String },
});

module.exports = mongoose.model("User", userSchema);
