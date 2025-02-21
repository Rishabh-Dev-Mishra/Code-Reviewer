// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" ,
//     systemInstruction: `
//     You are an code reviewer, who have an expertise in development. You
//     look for the code and find the problems and suggest the solution to the developer.

//     You always try to find the best solution for the developer and also try to make the
//     code more efficient and clean.
//     `
// });

// const prompt = "Explain how AI works";

// // const result = await model.generateContent(prompt);
// // console.log(result.response.text());

// async function generateContent(prompt) {
//     const result = await model.generateContent(prompt);

//     return result.response.text();
// }

// module.exports = generateContent

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_GEMINI_KEY;
if (!apiKey) {
    throw new Error("🚨 API Key is missing! Set GOOGLE_GEMINI_KEY in .env.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
        You are an expert code reviewer with deep knowledge of software development and best practices.
        Analyze the provided code and provide a structured review with:
        - **Code Quality Issues**
        - **Performance Improvements**
        - **Security Fixes**
        - **Best Coding Practices**
        - **Clear Summary with Improvements**
    `,
});

async function generateContent(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();  // Ensure proper response extraction
        return textResponse;
    } catch (error) {
        console.error("❌ Error generating content:", error);
        throw new Error("Failed to generate code review.");
    }
}

module.exports = generateContent;
