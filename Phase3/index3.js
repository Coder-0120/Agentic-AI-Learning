// Retrieve Top 3 Documents
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
  "Cricket is the most popular sport in India.",
  "Coding is my life.",
  "I am Mern Stack developer."
];

const query = "Tell me about coding";

const queryEmbedding = await getEmbedding(query);
const results = [];

for (const doc of docs) {
  const docEmbedding = await getEmbedding(doc);

  const score = cosineSimilarity(queryEmbedding,docEmbedding);
  results.push({
    document:doc,
    score
  })
  // sort result in descending order as per score 
  results.sort((a,b)=>b.score-a.score);
}

console.log("\n Top 3 best match as per user query:");
console.log(results.slice(0,3));