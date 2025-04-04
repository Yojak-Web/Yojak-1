const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) return res.status(400).json({ error: "Admin already registered" });

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, email, password: hashedPassword, isRegistered: true });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
