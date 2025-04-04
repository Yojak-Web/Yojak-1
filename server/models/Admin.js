const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isRegistered: { type: Boolean, default: false }, // Ensures only one admin can register
});

module.exports = mongoose.model("Admin", adminSchema);
