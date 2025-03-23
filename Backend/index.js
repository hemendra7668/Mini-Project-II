const express = require("express");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get("", (req, res) => {
  res.send("Welcome to the Express App!");
});

app.get("/chatres", (req, res) => {
  const userMessage = UserMessage;

  res.json({
    response: `The message you sent was: "${userMessage}". Bot is here to help!`,
  });
});

// POST /chatres route
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  UserMessage = userMessage;
  res.json({
    response: `Bot received your message: "${UserMessage}"`,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
