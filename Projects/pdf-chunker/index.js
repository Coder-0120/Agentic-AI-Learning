import fs from "fs";
import pdf from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function extractAndEmbedPDF() {
  try {
    // Read PDF
    const dataBuffer = fs.readFileSync("sample.pdf");

    // Extract Text
    const data = await pdf(dataBuffer);
    const text = data.text;

    // Create Chunks
    const chunkSize = 100;
    const chunks = [];

    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    console.log("Total Chunks:", chunks.length);

    // Generate Embeddings
    const embeddedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Generating embedding for Chunk ${i + 1}...`);

      const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: chunks[i],
      });

      embeddedChunks.push({
        chunk: chunks[i],
        embedding: response.embeddings[0].values,
      });
    }

    console.log("\nEmbedding Generated Successfully!");

    console.log("\nFirst Chunk:");
    console.log(embeddedChunks[0].chunk);

    console.log("\nEmbedding Length:");
    console.log(embeddedChunks[0].embedding.length);

  } catch (error) {
    console.log(error);
  }
}

extractAndEmbedPDF();