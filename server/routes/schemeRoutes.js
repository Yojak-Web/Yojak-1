const express = require("express");
const {
    addScheme,
    getSchemes,
    deleteScheme,
    updateScheme,
    getPersonalizedSchemes,
    getSchemeWithSummary
} = require("../controllers/schemeController");
const Scheme = require("../models/Scheme"); // Import the Scheme model

const router = express.Router();

router.post("/add", addScheme);
router.get("/all", getSchemes);
router.delete("/:id", deleteScheme);
router.put("/:id", updateScheme);
router.post("/personalized", getPersonalizedSchemes);
router.get("/summary/:id", getSchemeWithSummary);

router.get("/api/scheme/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const { lang = "en" } = req.query;
  
      const scheme = await Scheme.findOne({ name: new RegExp(`^${name}$`, "i") });
  
      if (!scheme) {
        return res.status(404).json({ error: "Scheme not found in the database." });
      }
  
      res.json({
        name: scheme.name,
        description: scheme.description?.[lang] || scheme.description?.["en"] || "Description not available",
        eligibility: scheme.eligibility?.[lang] || scheme.eligibility?.["en"] || "Eligibility not available",
        explanation: scheme.explanation?.[lang] || scheme.explanation?.["en"] || "Explanation not available",
        official_link: scheme.official_link || "No official link available"
      });
    } catch (error) {
      console.error("❌ Error fetching scheme:", error);
      res.status(500).json({ error: "Internal server error. Please check logs." });
    }
  });
  
module.exports = router;
