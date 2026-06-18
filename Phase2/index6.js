// sending pdf file to summarize it 
import { GoogleGenAI, createPartFromUri } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const pdf = await ai.files.upload({
    file: "./Full_Stack_Assignment_Advanced_260225_013337.pdf",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "Summarize this PDF"
          },
          createPartFromUri(
            pdf.uri,
            pdf.mimeType
          )
        ]
      }
    ]
  });

  console.log(response.text);
}

main();