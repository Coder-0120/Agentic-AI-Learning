import {GoogleGenAI} from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});
//-------------------------------------------------------------------------------------------------------------------------------
// const response=await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents:"Define MERN STACK in 20 words only "
// });

// console.log(response.text); // one time response when done fully

//-------------------------------------------------------------------------------------------------------------------------------
// for stream responses ,means giving side by side during generating 


// const stream=await ai.models.generateContentStream({
//     model: "gemini-3-flash-preview",
//     contents:"Define MERN STACK in 20 words only "
// });

// for await (const chunk of stream){
//     process.stdout.write(chunk.text);
// }
//-------------------------------------------------------------------------------------------------------------------------------
// chats creating for multi turn conversations
// const chat = await ai.chats.create({
//   model: "gemini-3-flash-preview",
// });

// const response1 = await chat.sendMessage({
//   message: "Hello, My name is Anshul",
// });

// console.log("Response 1:", response1.text);

// const response2 = await chat.sendMessage({
//   message: "Can you tell me my name?",
// });

// console.log("Response 2:", response2.text);
//-------------------------------------------------------------------------------------------------------------------------------
//Learning to integerate tools like google search
const response=await ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:"tell me latest iphone released ?",
    tools:[
        {
            googleSearch:{}
        }
    ]
})
console.log(response.text);
// User question
//    ↓
// Gemini sees: needs latest info
//    ↓
// Activates Google Search tool
//    ↓
// Fetches real web data
//    ↓
// Summarizes result
//    ↓
// Final answer returned