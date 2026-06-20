// rag fundamentals
//1. What are Embeddings?
// An embedding is a numerical representation of text.
//Normal databases:Can only find exact matches.
//Vector DB searches based on meaning. like ChromaDB , Pinecone,FAISS
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})
const text1 = "I love coding";
const text2 = "I enjoy playing cricket";

const emb1 = await ai.models.embedContent({
  model: "gemini-embedding-001",
  contents: text1
});
const emb2 = await ai.models.embedContent({
  model: "gemini-embedding-001",
  contents: text2
});
// console.log("Some vectors of embedding vectors for text1 : ",
//   emb1.embeddings[0].values.slice(0, 5)
// );
// console.log("numbers are present in the embedding vector for text1 : ",emb1.embeddings[0].values.length);
// console.log("numbers are present in the embedding vector for text2 : " ,emb2.embeddings[0].values.length);

//-------------------------------------------------------//-------------------------------------------------------
// Calculate Cosine Similarity
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

const similarity = cosineSimilarity(
  emb1.embeddings[0].values,
  emb2.embeddings[0].values
);

console.log(similarity);