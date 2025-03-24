require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.MY_SECRET_KEY;

const openai = new OpenAI({ apiKey: apiKey });

let nameResults = [];

app.get("/", (req, res) => {
  res.send("Welcome to the Express App!");
});

// GET request to fetch generated names
app.get("/chatres", (req, res) => {
  if (nameResults.length === 0) {
    return res.status(404).json({ error: "No names available. Query first!" });
  }
  res.json(nameResults);
});

// POST request to OpenAI API
app.post("/chat", async (req, res) => {
  const { name } = req.body; // FIXED destructuring issue

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a name expert. Given a name, return a JSON array containing:
            - "id": Unique ID
            - "name": The name
            - "synonyms": List of synonyms
            - "explanation": Short description.
            Return JSON only, no additional text.`,
        },
        {
          role: "user",
          content: `Generate a list of 5 similar names for '${name}' in JSON format.`,
        },
      ],
      max_tokens: 500,
    });

    console.log("OpenAI Response:", response);

    // Ensure the response has choices and content
    if (!response.choices || response.choices.length === 0) {
      return res.status(500).json({ error: "Invalid response from OpenAI" });
    }

    const chatbotResponse = response.choices[0].message.content.trim();

    // Parse OpenAI response safely
    try {
      const parsedResponse = JSON.parse(chatbotResponse);
      nameResults = parsedResponse;
      res.json({ message: "Names generated successfully", data: nameResults });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      res.status(500).json({ error: "Failed to parse OpenAI response" });
    }
  } catch (error) {
    console.error("Error querying name details:", error);
    res.status(500).json({ error: "Failed to retrieve name details" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
