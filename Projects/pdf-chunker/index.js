import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenAI } from "@google/genai";
import faiss from "faiss-node";
const { IndexFlatL2 } = faiss;
import dotenv from "dotenv";
dotenv.config();

// Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
|--------------------------------------------------------------------------
| Chunk Text with Overlap
|--------------------------------------------------------------------------
| Example:
|
| Chunk 1 -> Characters 0-100
| Chunk 2 -> Characters 80-180
|
| Overlap helps preserve context.
|--------------------------------------------------------------------------
*/
function createChunks(text, chunkSize = 100, overlap = 20) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    const chunk = text.slice(i, i + chunkSize);

    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
  }

  return chunks;
}

/*
|--------------------------------------------------------------------------
| Generate Embedding using Gemini
|--------------------------------------------------------------------------
*/
async function getEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings[0].values;
}

/*
|--------------------------------------------------------------------------
| Main Function
|--------------------------------------------------------------------------
*/
async function extractAndEmbedPDF() {
  try {
    console.log("📄 Reading PDF...\n");

    /*
    ------------------------------------------------------------------------
    | Read PDF File
    ------------------------------------------------------------------------
    */
    const dataBuffer = fs.readFileSync("sample.pdf");

    /*
    ------------------------------------------------------------------------
    | Extract Text
    ------------------------------------------------------------------------
    */
    const data = await pdf(dataBuffer);

    const text = data.text;

    console.log(`✅ Pages: ${data.numpages}`);
    console.log(`✅ Characters Extracted: ${text.length}\n`);

    /*
    ------------------------------------------------------------------------
    | Create Chunks
    ------------------------------------------------------------------------
    */
    const chunks = createChunks(text);

    console.log(`✅ Total Chunks Created: ${chunks.length}\n`);

    /*
    ------------------------------------------------------------------------
    | Generate Embeddings
    ------------------------------------------------------------------------
    */
    const embeddedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      console.log(
        `🔄 Generating Embedding ${i + 1}/${chunks.length}`
      );

      const embedding = await getEmbedding(chunks[i]);

      embeddedChunks.push({
        chunk: chunks[i],
        embedding,
      });
    }

    console.log("\n✅ All Embeddings Generated Successfully!\n");

    /*
    ------------------------------------------------------------------------
    | Create FAISS Index
    ------------------------------------------------------------------------
    */
    const dimension = embeddedChunks[0].embedding.length;

    console.log(`📏 Embedding Dimension: ${dimension}`);

    const index = new IndexFlatL2(dimension);

    /*
    ------------------------------------------------------------------------
    | Store Vectors in FAISS
    ------------------------------------------------------------------------
    */
    embeddedChunks.forEach((item) => {
      index.add(item.embedding);
    });

    console.log(`✅ Stored ${embeddedChunks.length} vectors in FAISS\n`);

    /*
    ------------------------------------------------------------------------
    | Search Query
    ------------------------------------------------------------------------
    */
    const query = "What is FAISS?";

    console.log(`🔍 Query: ${query}\n`);

    /*
    ------------------------------------------------------------------------
    | Generate Query Embedding
    ------------------------------------------------------------------------
    */
    const queryEmbedding = await getEmbedding(query);

    /*
    ------------------------------------------------------------------------
    | Retrieve Top 2 Similar Chunks
    ------------------------------------------------------------------------
    */
    const result = index.search(queryEmbedding, 2);

    console.log("📊 Search Result:");
    console.log(result);

    /*
    ------------------------------------------------------------------------
    | Show Retrieved Chunks
    ------------------------------------------------------------------------
    */
    console.log("\n🎯 Top Matching Chunks:\n");

    result.labels.forEach((chunkIndex, rank) => {
      console.log(
        `================ Rank ${rank + 1} ================`
      );

      console.log(
        embeddedChunks[chunkIndex].chunk
      );

      console.log("\n");
    });
  } catch (error) {
    console.error("❌ Error:");
    console.error(error);
  }
}

/*
|--------------------------------------------------------------------------
| Run Application
|--------------------------------------------------------------------------
*/
extractAndEmbedPDF();