import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// function to calculate cosine Similarity
function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function getEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings[0].values;
}

const docs = [
  "Virat Kohli is one of the greatest cricketers.",
  "JavaScript is used for web development.",
  "React is a frontend library.",
  "Cricket is the most popular sport in India."
];

const query = "Tell me about Development";

const queryEmbedding = await getEmbedding(query);

let bestMatch = "";
let highestScore = -1;

for (const doc of docs) {
  const docEmbedding = await getEmbedding(doc);

  const score = cosineSimilarity(queryEmbedding,docEmbedding);
  console.log(doc, score);

  if (score > highestScore) {
    highestScore = score;
    bestMatch = doc;
  }
}

console.log("\nBest Match:");
console.log(bestMatch);