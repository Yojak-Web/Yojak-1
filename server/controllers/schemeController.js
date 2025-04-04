const Scheme = require("../models/Scheme");
const openai = require("../services/openaiService");
const mongoose = require("mongoose");

// ✅ Add Scheme
exports.addScheme = async (req, res) => {
    try {
        console.log("🔹 Incoming Request Body:", req.body);
        console.log("🔹 Admin User:", req.user);

        const {
            name, description, eligibility, benefits, officialLink, gender, caste,
            education, annualIncome, state, district, maritalStatus, disability,
            employmentType, occupation
        } = req.body;

        // ✅ Ensure annualIncome is parsed as a number
        const parsedAnnualIncome = annualIncome ? parseInt(annualIncome) : null;
        console.log("🔹 Parsed Annual Income:", parsedAnnualIncome);

        // ✅ Validate required fields
        if (!name || !description || !eligibility || !benefits || !officialLink || parsedAnnualIncome === null) {
            return res.status(400).json({ error: "❌ All fields are required, including annualIncome" });
        }

        const newScheme = new Scheme({
            name, description, eligibility, benefits, officialLink, gender, caste,
            education, annualIncome: parsedAnnualIncome, state, district,
            maritalStatus, disability, employmentType, occupation
        });

        await newScheme.save();
        console.log("✅ Scheme Added:", newScheme);

        res.status(201).json({ message: "Scheme added successfully", scheme: newScheme });
    } catch (error) {
        console.error("❌ Error Adding Scheme:", error);
        res.status(500).json({ error: "Server error while adding scheme" });
    }
};

// ✅ Get All Schemes
exports.getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json(schemes);
    } catch (error) {
        console.error("❌ Error fetching schemes:", error);
        res.status(500).json({ error: "Error fetching schemes" });
    }
};

// ✅ Delete Scheme
exports.deleteScheme = async (req, res) => {
    try {
        await Scheme.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Scheme deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting scheme" });
    }
};

// ✅ Update Scheme
exports.updateScheme = async (req, res) => {
    try {
        const updatedScheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Scheme updated successfully", scheme: updatedScheme });
    } catch (error) {
        res.status(500).json({ error: "Error updating scheme" });
    }
};

// ✅ Get Personalized Schemes
exports.getPersonalizedSchemes = async (req, res) => {
    try {
        const { gender, caste, education, annualIncome, disability, employmentType, state } = req.body;

        let filters = {};

        if (gender) filters.gender = { $in: [gender, "All"] };
        if (caste) filters.caste = { $in: [caste, "All"] };
        if (education) filters.education = { $in: [education, "All"] };
        if (state) filters.state = { $in: [state, "All"] };
        if (employmentType) filters.employmentType = { $in: [employmentType, "All"] };
        if (disability === "Yes") filters.disability = "Yes";

        // ✅ Filter by annualIncome
        if (annualIncome && !isNaN(parseInt(annualIncome))) {
            filters.annualIncome = { $gte: parseInt(annualIncome) };
        }

        console.log("🔹 Filtering Schemes Based On:", filters);
        const schemes = await Scheme.find(filters);

        res.status(200).json({ schemes });
    } catch (error) {
        console.error("❌ Error Fetching Personalized Schemes:", error);
        res.status(500).json({ error: "Server error while fetching schemes" });
    }
};

// ✅ Get Scheme with AI Summary
exports.getSchemeWithSummary = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid scheme ID format" });
        }

        const scheme = await Scheme.findById(id);
        if (!scheme) {
            return res.status(404).json({ error: "Scheme not found" });
        }

        const prompt = `Summarize the following government scheme:\n\nName: ${scheme.name}\nDescription: ${scheme.description}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json({ 
            name: scheme.name,
            description: scheme.description,
            eligibility: scheme.eligibility,
            benefits: scheme.benefits,
            summary: response.choices[0].message.content,
            officialLink: scheme.officialLink
        });
    } catch (error) {
        console.error("❌ OpenAI Error:", error);
        res.status(500).json({ error: "Server error while generating summary" });
    }
};
