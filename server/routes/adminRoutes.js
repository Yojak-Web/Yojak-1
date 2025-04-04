const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminAuthController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");


const router = express.Router();

router.post("/register", registerAdmin); // ✅ Only POST is allowed, not GET
router.post("/login", loginAdmin);

router.get("/test", adminAuthMiddleware, (req, res) => {
  res.json({ message: "✅ Admin Authenticated", user: req.user });
});

module.exports = router;
