// Multimodal inputs
// The Gemini API supports multimodal inputs, allowing you to combine text with media files
import {  GoogleGenAI,createUserContent,createPartFromUri} from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
const image=await ai.files.upload({
    file:"european-shorthair-8601492_1280.jpg"
})
const response=await ai.models.generateContent({
  model:"gemini-3-flash-preview",
  contents:[
    createUserContent(
        [
            "Which animal is shown in image",
            createPartFromUri(image.uri,image.mimeType)
        ]
    )
  ]  
})
console.log(response.text);
}
main();