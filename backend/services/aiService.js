const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeInterview(role, qna) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an expert interviewer. Analyze the following mock interview for the role of ${role}.
      
      Questions and Answers:
      ${JSON.stringify(qna, null, 2)}
      
      Provide a JSON response with the following structure:
      {
        "summary": "A concise summary of the candidate's performance.",
        "rating": "A score out of 10 (e.g., 8/10).",
        "areasOfFocus": ["Area 1 to improve", "Area 2 to improve", "Area 3 to improve"]
      }
      
      Do not include any markdown formatting or code blocks in your response. Just the raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response if it contains markdown code blocks
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error analyzing interview:", error);
    throw new Error("Failed to analyze interview");
  }
}

module.exports = { analyzeInterview };
