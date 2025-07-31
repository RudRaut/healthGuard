// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { InferenceClient } from '@huggingface/inference';

// // Load environment variables from .env file
// dotenv.config();

// // --- Initialize Express App and Middleware ---
// const app = express();
// const port = process.env.PORT || 3000;

// // Enable CORS for all origins
// app.use(cors({
//   origin: '*', // allow all origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Enable built-in middleware for parsing JSON bodies
// app.use(express.json());

// // --- Initialize Hugging Face Inference Client ---
// const hfToken = process.env.HF_TOKEN;
// if (!hfToken) {
//   console.error("HF_TOKEN is not set in the .env file. Please add it.");
//   process.exit(1); // Exit if the token is missing
// }
// const client = new InferenceClient(hfToken);


// const modelSize = process.env.HF_MODEL_SIZE || '8b';
//   const modelName = modelSize === '70b'
//     ? 'm42-health/Llama3-Med42-70B'
//     : 'm42-health/Llama3-Med42-8B';

// // --- API Routes ---

// /**
//  * @route POST /getSuggestions
//  * @desc Get health suggestions based on heart rate and temperature.
//  * @access Public
//  * @body { heartRate: string, temperature: string }
//  */
// app.post('/getSuggestions', async (req, res) => {
//   const { heartRate, temperature } = req.body;

//   // Basic validation for input
//   if (!heartRate || !temperature) {
//     return res.status(400).json({ error: 'Both heartRate and temperature are required.' });
//   }

  

//   // --- Construct the Prompt for the AI Model ---
//   // This prompt is structured to guide the model into providing a JSON response.
//   const prompt = `
//     Analyze the following health data: Heart Rate is ${heartRate} bpm and Body Temperature is ${temperature}°F.
//     Based on this data, provide a JSON object with three keys:
//     1. "badSign": A string describing any potential negative signs. If none, say "No bad signs noted".
//     2. "goodSign": A string describing any positive signs. If none, say "Data is within a neutral range.".
//     3. "improvementSuggestion": A string with a concrete suggestion for health improvement.

//     Your response must be ONLY the raw JSON object, without any surrounding text, explanations, or markdown formatting.
//     Example format:
//     {
//       "badSign": "...",
//       "goodSign": "...",
//       "improvementSuggestion": "..."
//     }
//   `;

//   try {
//     console.log("Sending request to Hugging Face API...");

//     // --- Call the Hugging Face Chat Completion API ---
//     const chatCompletion = await client.chatCompletion({
//       provider: "featherless-ai", 
//       model: modelName,
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       // temperature: 0.7, // Adjust for more or less creative responses
//       // max_tokens: 250,
//     });

//     // --- Process and Parse the Model's Response ---
//     const rawResponse = chatCompletion.choices[0]?.message?.content;
//     console.log("Raw response from model:", rawResponse);

//     if (!rawResponse) {
//       throw new Error("Received an empty response from the model.");
//     }

//     // The model might return the JSON string inside markdown backticks.
//     // This logic cleans it up before parsing.
//     const cleanedResponse = rawResponse.replace(/```json\n|\n```/g, '').trim();

//     // Parse the cleaned string into a JSON object
//     const parsedJson = JSON.parse(cleanedResponse);
    
//     // Send the final parsed JSON to the client
//     res.status(200).json(parsedJson);

//   } catch (error) {
//     console.error("Error during API call or parsing:", error);
//     // Provide a more detailed error message for debugging
//     res.status(500).json({ 
//         error: 'Failed to get suggestions from the model.',
//         details: error.message 
//     });
//   }
// });

// // --- Start the Server ---
// app.listen(port, () => {
//   console.log('\n',"Model: ", modelName);
//   console.log(`Server is running on http://localhost:${port}`);
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { InferenceClient } from '@huggingface/inference';
import os from 'os'; // 1. Import the 'os' module

// Load environment variables from .env file
dotenv.config();

// --- Initialize Express App and Middleware ---
const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Listen on all network interfaces

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// --- Initialize Hugging Face Inference Client ---
const hfToken = process.env.HF_TOKEN;
if (!hfToken) {
  console.error("HF_TOKEN is not set in the .env file. Please add it.");
  process.exit(1);
}
const client = new InferenceClient(hfToken);

const modelSize = process.env.HF_MODEL_SIZE || '8b';
const modelName = modelSize === '70b'
  ? 'm42-health/Llama3-Med42-70B'
  : 'm42-health/Llama3-Med42-8B';

// --- API Routes ---
app.post('/getSuggestions', async (req, res) => {
  const { heartRate, temperature } = req.body;

  console.log("BODY: ", req.body, 'HR: ', heartRate, 'TEMP: ', temperature);
  

  if (!heartRate || !temperature) {
    return res.status(400).json({ error: 'Both heartRate and temperature are required.' });
  }

  const prompt = `
    Analyze the following health data: Heart Rate is ${heartRate} bpm and Body Temperature is ${temperature}°F.
    Based on this data, provide a JSON object with three keys:
    1. "badSign": A string describing any potential negative signs. If none, say "No bad signs noted".
    2. "goodSign": A string describing any positive signs. If none, say "Data is within a neutral range.".
    3. "improvementSuggestion": A string with a concrete suggestion for health improvement.

    Your response must be ONLY the raw JSON object, without any surrounding text, explanations, or markdown formatting.
  `;

  try {
    console.log("Sending request to Hugging Face API...");

    const chatCompletion = await client.chatCompletion({
      provider: "featherless-ai",
      model: modelName,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawResponse = chatCompletion.choices[0]?.message?.content;
    console.log("Raw response from model:", rawResponse);

    if (!rawResponse) {
      throw new Error("Received an empty response from the model.");
    }

    const cleanedResponse = rawResponse.replace(/```json\n|\n```/g, '').trim();
    const parsedJson = JSON.parse(cleanedResponse);

    res.status(200).json(parsedJson);
  } catch (error) {
    console.error("Error during API call or parsing:", error);
    res.status(500).json({
      error: 'Failed to get suggestions from the model.',
      details: error.message
    });
  }
});

// --- 2. Update the Server Start Block ---
app.listen(port, host, () => {
  console.log('\n', "Model:", modelName);
  console.log(`  ➜  Local:   http://localhost:${port}/`);

  // Find and display the network address
  const networkInterfaces = os.networkInterfaces();
  let networkUrl = null;
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        networkUrl = `http://${iface.address}:${port}/`;
        break;
      }
    }
    if (networkUrl) break;
  }

  if (networkUrl) {
    console.log(`  ➜  Network: ${networkUrl}`);
  }
  console.log('\n');
});