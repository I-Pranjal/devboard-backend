const express = require('express');
const router = express.Router();
const GoogleGenAI = require('@google/genai').GoogleGenAI;


const geminiAPI = process.env.VITE_GEMINI_API ;
const ai = new GoogleGenAI({ apiKey: geminiAPI });

router.post('/', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: userMessage,
        });
        const botmessage = response.text ;
        res.json(botmessage);
    } catch (err) {
        console.error("Gemini error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}); 

module.exports = router;