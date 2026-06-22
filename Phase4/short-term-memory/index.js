import dotenv from "dotenv";
import readline from "readline";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Short-term memory
const messages = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function startChat() {
  while (true) {
    const userInput = await askQuestion("\nYou: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye 👋");
      rl.close();
      break;
    }

    // Store user message in memory
    messages.push({
      role: "user",
      content: userInput,
    });

    // Build conversation history
    const history = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,
    });

    const answer = response.text;

    console.log(`\nAI: ${answer}`);

    // Store AI answer in memory
    messages.push({
      role: "assistant",
      content: answer,
    });

    // See memory growing
    console.log("\nMemory:");
    console.log(messages);
  }
}

startChat();