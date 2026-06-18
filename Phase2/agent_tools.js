import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  // Tool declaration
  const weatherFunction = {
    name: "get_current_temperature",
    description: "Gets current temperature for a city",
    parameters: {
      type: Type.OBJECT,
      properties: {
        location: {
          type: Type.STRING,
          description: "City name",
        },
      },
      required: ["location"],
    },
  };

  // User message
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: "What is the temperature in Delhi?",
        },
      ],
    },
  ];

  // First Gemini call
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      tools: [
        {
          functionDeclarations: [weatherFunction],
        },
      ],
    },
  });

  console.log("\n=== First Response ===");
  console.log(JSON.stringify(response.functionCalls, null, 2));

  // Did Gemini request a function?
  if (
    response.functionCalls &&
    response.functionCalls.length > 0
  ) {
    const fc = response.functionCalls[0];

    console.log("\nFunction Name:", fc.name);
    console.log("Location:", fc.args.location);

    // Mock tool result
    const weatherResult = {
      temperature: "38°C",
      condition: "Sunny",
    };

    // Add Gemini's function call message
    contents.push(response.candidates[0].content);

    // Send function result back
    contents.push({
      role: "user",
      parts: [
        {
          functionResponse: {
            name: fc.name,
            response: weatherResult,
            id: fc.id,
          },
        },
      ],
    });

    // Second Gemini call
    const finalResponse =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          tools: [
            {
              functionDeclarations: [
                weatherFunction,
              ],
            },
          ],
        },
      });

    console.log("\n=== Final Answer ===");
    console.log(finalResponse.text);
  } else {
    console.log("No function call requested");
    console.log(response.text);
  }
}

main();