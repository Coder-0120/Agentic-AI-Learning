// Building our first AI Agent - Hello Anshul Verma !! 
import {GoogleGenAI} from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

const response=await ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:"Always reply with Hello Anshul Verma !!"
})

console.log(response.text);