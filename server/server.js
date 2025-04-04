require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const schemeRoutes = require("./routes/schemeRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/schemes", schemeRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ DB Connection Error:", error));

  app.post("/api/chatbot", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // ✅ Get the correct model name from /models route
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Update if needed
        const chat = model.startChat();

        // ✅ Use `sendMessage` instead of `generateContent`
        const result = await chat.sendMessage(message);
        
        // ✅ Extract response properly
        const response = result.response.candidates[0]?.content?.parts[0]?.text || "I'm not sure how to answer that.";

        res.json({ reply: response });

    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  app.get("/models", async (req, res) => {
    try {
      const models = await genAI.listModels();
      res.json({ models: models.models.map(model => model.name) }); // Show model names
    } catch (error) {
      console.error("Model List Error:", error);
      res.status(500).json({ error: "Could not fetch models" });
    }
  });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on PORT ${PORT}`));
