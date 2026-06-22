import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import readline from "readline";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import faiss from "faiss-node";

dotenv.config();

const { IndexFlatL2 } = faiss;

// Gemini Client 
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
|--------------------------------------------------------------------------
| Create Text Chunks with Overlap
|--------------------------------------------------------------------------
|
| Example:
|
| Chunk 1 -> Characters 0 - 500
| Chunk 2 -> Characters 400 - 900
|
| Overlap preserves context between chunks.
|
|--------------------------------------------------------------------------
*/
function createChunks(text, chunkSize = 500, overlap = 100) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    const chunk = text.slice(i, i + chunkSize);

    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
  }

  return chunks;
}

// Generate Embedding using Gemini
async function getEmbedding(text) {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
    });

    return response.embeddings[0].values;
  } catch (error) {
    console.error("Embedding Error:", error);
    throw error;
  }
}

// Ask Question in Terminal
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Main function
async function chatWithPDF() {
  try {
    console.log("\n🚀 Starting Chat With PDF...\n");

    /*
    ------------------------------------------------------------------------
    | Step 1: Read PDF
    ------------------------------------------------------------------------
    */
    console.log("📄 Reading PDF...");
    const dataBuffer = fs.readFileSync("sample.pdf");

    /*
    ------------------------------------------------------------------------
    | Step 2: Extract Text
    ------------------------------------------------------------------------
    */
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;
    console.log(`✅ Pages: ${pdfData.numpages}`);
    console.log(`✅ Characters Extracted: ${text.length}`);

    /*
    ------------------------------------------------------------------------
    | Step 3: Create Chunks
    ------------------------------------------------------------------------
    */
    console.log("\n✂️ Creating Chunks...");
    const chunks = createChunks(text);
    console.log(`✅ Total Chunks: ${chunks.length}`);

    /*
    ------------------------------------------------------------------------
    | Step 4: Generate Embeddings
    ------------------------------------------------------------------------
    */
    console.log("\n🧠 Generating Embeddings...");
    const embeddedChunks = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(
        `🔄 Embedding ${i + 1}/${chunks.length}`
      );
      const embedding = await getEmbedding(chunks[i]);
      embeddedChunks.push({
        chunk: chunks[i],
        embedding,
      });
    }

    console.log("\n✅ All Embeddings Generated");

    /*
    ------------------------------------------------------------------------
    | Step 5: Create FAISS Index
    ------------------------------------------------------------------------
    */
    const dimension =
      embeddedChunks[0].embedding.length;

    console.log(
      `\n📏 Embedding Dimension: ${dimension}`
    );

    const index = new IndexFlatL2(dimension);

    /*
    ------------------------------------------------------------------------
    | Step 6: Store Embeddings in FAISS
    ------------------------------------------------------------------------
    */
    console.log("\n💾 Storing Vectors in FAISS...");
    embeddedChunks.forEach((item) => {
      index.add(item.embedding);
    });
    console.log(
      `✅ Stored ${embeddedChunks.length} vectors`
    );

    /*
    ------------------------------------------------------------------------
    | Step 7: Start Chat Loop
    ------------------------------------------------------------------------
    */
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n🤖 PDF Assistant Ready!");
    console.log("Type 'exit' to quit.\n");

    while (true) {
      /*
      ----------------------------------------------------------------------
      | Get User Query
      ----------------------------------------------------------------------
      */
      const query = await askQuestion(rl,"❓ Ask Question: ");
      if (query.trim().toLowerCase() === "exit") {
        console.log("\n👋 Goodbye!");
        rl.close();
        break;
      }

      console.log("\n🔍 Searching PDF...\n");

      /*
      ----------------------------------------------------------------------
      | Generate Query Embedding
      ----------------------------------------------------------------------
      */
      const queryEmbedding =await getEmbedding(query);
      /*
      ----------------------------------------------------------------------
      | Retrieve Top 3 Similar Chunks
      ----------------------------------------------------------------------
      */
      const result = index.search(queryEmbedding,3);

      /*
      ----------------------------------------------------------------------
      | Build Context
      ----------------------------------------------------------------------
      */
      const context = result.labels
        .map((chunkIndex) => {
          return embeddedChunks[chunkIndex]?.chunk;
        })
        .filter(Boolean)
        .join("\n\n");

      /*
      ----------------------------------------------------------------------
      | Prompt for Gemini
      ----------------------------------------------------------------------
      */
      const prompt = `
You are a helpful PDF assistant.
Answer ONLY from the provided context.
If the answer is not available in the context,
respond with:
"I could not find that information in the PDF."

-----------------------------
CONTEXT
-----------------------------
${context}

-----------------------------
QUESTION
-----------------------------
${query}
`;

      /*
      ----------------------------------------------------------------------
      | Generate Final Answer
      ----------------------------------------------------------------------
      */
      const response =await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

      /*
      ----------------------------------------------------------------------
      | Display Answer
      ----------------------------------------------------------------------
      */
      console.log("\n🤖 Answer:\n");
      console.log(response.text);

      console.log(
        "\n====================================================\n"
      );
    }
  } catch (error) {
    console.error("\n❌ Application Error:");
    console.error(error);
  }
}

/*
|--------------------------------------------------------------------------
| Run Application
|--------------------------------------------------------------------------
*/
chatWithPDF();