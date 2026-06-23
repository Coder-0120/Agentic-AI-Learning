import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Profile storage file
const PROFILE_FILE = "profile.json";

// Create profile file if it doesn't exist
if (!fs.existsSync(PROFILE_FILE)) {
  fs.writeFileSync(PROFILE_FILE, JSON.stringify({}, null, 2));
}

// Load profile from disk
function loadProfile() {
  return JSON.parse(fs.readFileSync(PROFILE_FILE, "utf-8"));
}

// Save profile to disk
function saveProfile(profile) {
  fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2));
}

// Extract user information using Gemini
async function extractProfile(message) {
  const prompt = `
Extract user profile information from the message.
Return JSON only.
Possible fields:
{
  "name": "",
  "college": "",
  "profession": "",
  "skills": [],
  "interests": []
}
Message:
${message}
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  try {
    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch {
    return {};
  }
}

// Merge new profile data with old profile
function mergeProfile(oldProfile, newProfile) {
  return {
    ...oldProfile,
    ...newProfile,
  };
}

// Generate personalized response using profile memory
async function generateResponse(message, profile) {
  const prompt = `
You are a personal AI assistant.

User Profile:
${JSON.stringify(profile, null, 2)}

User Message:
${message}

Answer naturally and use profile information whenever relevant.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

// Main handler for each user message
async function handleMessage(message) {
  let profile = loadProfile();

  const extractedProfile = await extractProfile(message);

  if (Object.keys(extractedProfile).length > 0) {
    profile = mergeProfile(profile, extractedProfile);
    saveProfile(profile);
  }

  return await generateResponse(message, profile);
}

// Create command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🤖 Personal AI Assistant Started");
console.log("Type 'exit' to quit");

// Start chat loop
function chat() {
  rl.question("\nYou: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye 👋");
      rl.close();
      return;
    }

    const reply = await handleMessage(input);

    console.log(`\nAgent: ${reply}`);

    chat();
  });
}

chat();