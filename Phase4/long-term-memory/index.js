import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

/*
|--------------------------------------------------------------------------
| Catch Unhandled Errors
|--------------------------------------------------------------------------
*/
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

/*
|--------------------------------------------------------------------------
| Gemini Client
|--------------------------------------------------------------------------
*/
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
|--------------------------------------------------------------------------
| Load Memory
|--------------------------------------------------------------------------
*/
let messages = [];

try {
  if (fs.existsSync("memory.json")) {
    const data = fs.readFileSync("memory.json", "utf8");

    if (data.trim()) {
      messages = JSON.parse(data);
    }
  }
} catch (error) {
  console.error("Error loading memory:", error);
}

console.log("\n📂 Loaded Memory:");
console.log(messages);

/*
|--------------------------------------------------------------------------
| Readline
|--------------------------------------------------------------------------
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
|--------------------------------------------------------------------------
| Ask Question
|--------------------------------------------------------------------------
*/
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

/*
|--------------------------------------------------------------------------
| Save Memory
|--------------------------------------------------------------------------
*/
function saveMemory() {
  try {
    fs.writeFileSync(
      "memory.json",
      JSON.stringify(messages, null, 2)
    );
  } catch (error) {
    console.error("Memory Save Error:", error);
  }
}

/*
|--------------------------------------------------------------------------
| Start Chat
|--------------------------------------------------------------------------
*/
async function startChat() {
  console.log("\n🤖 Long-Term Memory Chatbot");
  console.log("Type 'exit' to quit.\n");

  while (true) {
    try {
      const userInput = await askQuestion("You: ");

      if (!userInput.trim()) {
        continue;
      }

      if (userInput.toLowerCase() === "exit") {
        console.log("\n👋 Goodbye!");
        rl.close();
        process.exit(0);
      }

      /*
      ----------------------------------------------------------------------
      | Store User Message
      ----------------------------------------------------------------------
      */
      messages.push({
        role: "user",
        content: userInput,
      });

      saveMemory();

      /*
      ----------------------------------------------------------------------
      | Convert Memory To Gemini Format
      ----------------------------------------------------------------------
      */
      const contents = messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      console.log("🤔 Thinking...");

      /*
      ----------------------------------------------------------------------
      | Gemini Call
      ----------------------------------------------------------------------
      */
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });

      /*
      ----------------------------------------------------------------------
      | Extract Text Safely
      ----------------------------------------------------------------------
      */
      let answer = "";

      if (typeof response.text === "function") {
        answer = response.text();
      } else {
        answer = response.text || "No response received.";
      }

      /*
      ----------------------------------------------------------------------
      | Show Response
      ----------------------------------------------------------------------
      */
      console.log(`\nAI: ${answer}\n`);

      /*
      ----------------------------------------------------------------------
      | Store AI Response
      ----------------------------------------------------------------------
      */
      messages.push({
        role: "assistant",
        content: answer,
      });

      saveMemory();

      console.log(
        `📦 Memory Entries: ${messages.length}`
      );
      console.log(
        "--------------------------------------------------"
      );
    } catch (error) {
      console.error("\n❌ Gemini Error:");
      console.error(error);
    }
  }
}

/*
|--------------------------------------------------------------------------
| Run
|--------------------------------------------------------------------------
*/
startChat();