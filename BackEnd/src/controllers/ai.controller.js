const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).json({ error: "Code input is required" });
        }

        const response = await aiService(code);
        res.json({ review: response });
    } catch (error) {
        console.error("🔥 AI Service Error:", error);
        res.status(500).json({ error: "Internal Server Error. Please try again." });
    }
};
