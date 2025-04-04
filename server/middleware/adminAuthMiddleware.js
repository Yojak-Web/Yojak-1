const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); 

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) return res.status(401).json({ error: "Access Denied. No Token Provided." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(verified.id).select("-password");

    if (!req.user) return res.status(401).json({ error: "Unauthorized Admin" });

    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = adminAuthMiddleware;
