// learns to extract pdf file direct downloading using axios in binary and convet it into base64
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    // Download PDF
    const response = await axios.get(
      "https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf",
      {
        responseType: "arraybuffer",
      }
    );

    // Get MIME type from headers
    const mimeType = response.headers["content-type"];

    console.log("MIME Type:", mimeType);

    // Convert PDF to Base64
    const base64Data = Buffer.from(response.data).toString("base64");

    // Send PDF to Gemini
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: "Summarize this PDF in simple language."
        },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
      ],
    });

    console.log("\nSummary:\n");
    console.log(result.text);

  } catch (error) {
    console.error("Error:", error);
  }
}

main();