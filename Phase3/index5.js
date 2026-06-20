import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Knowledge Base

const docs = [
  "React is a JavaScript library for building user interfaces.",
  "Node.js allows JavaScript to run outside the browser.",
  "MongoDB is a NoSQL database that stores documents.",
  "RAG stands for Retrieval Augmented Generation.",
  "Embeddings are numerical representations of text."
];

// Embedding Function
async function getEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });
  return response.embeddings[0].values;
}

// Cosine Similarity
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

// Build Vector Store
async function buildVectorStore() {
  const vectorStore = [];
  for (const doc of docs) {
    const embedding = await getEmbedding(doc);
    vectorStore.push({
      text: doc,
      embedding,
    });
  }
  return vectorStore;
}

// Search
async function search(query, vectorStore) {
  const queryEmbedding =await getEmbedding(query);
  const results = vectorStore.map((doc) => ({
    text: doc.text,
    score: cosineSimilarity(
      queryEmbedding,
      doc.embedding
    ),
  }));
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 2);
}

// Gemini Answer
async function askGemini(query,retrievedDocs) {
  const context = retrievedDocs
    .map((doc) => doc.text)
    .join("\n");

  console.log("\nContext Sent To Gemini:");
  console.log(context);

  const prompt = `
You are a helpful assistant.
Answer ONLY from the provided context.
If the answer is not present in the context,
reply:
"I could not find that information."
Context:
${context}
Question:
${query}
`;

  const response =await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  return response.text;
}

// Main

async function main() {
  const vectorStore =await buildVectorStore();
  const query ="What is software?";
  console.log("Query:");
  console.log(query);

  const retrievedDocs =await search(query,vectorStore);
  console.log("\nTop Retrieved Documents:\n");
  retrievedDocs.forEach((doc) => {
    console.log(
      `Score: ${doc.score.toFixed(4)}`
    );
    console.log(doc.text);
    console.log();
  });

  const answer =await askGemini(query,retrievedDocs);
  console.log("\nGemini Answer:\n");
  console.log(answer);
}

main();