const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  officialLink: { type: String, required: true },
  gender: { type: String, default: "All" }, // Male, Female, All
  caste: { type: String, default: "All" }, // General, SC, ST, OBC, All
  education: { type: String, default: "All" }, // 10th, 12th, Graduate, etc.
  annualIncome: { type: Number, required: true }, // Income limit for eligibility
  disability: { type: String, default: "No" }, // Yes or No
  employmentType: { type: String, default: "All" }, // Private, Government, All
  state: { type: String, default: "All" }, // State-specific schemes
});

module.exports = mongoose.model("Scheme", SchemeSchema);
