// dynamic instructions.
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function getInstructions(location) {
  if (location === "India") {
    return `
      Always say Namaste.
      You are a friendly assistant.
    `;
  }

  return `
    Always say Hello.
    You are a friendly assistant.
  `;
}

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",

  config: {
    systemInstruction: getInstructions("India"),
  },

  contents: "Who are you?",
});

console.log(response.text);