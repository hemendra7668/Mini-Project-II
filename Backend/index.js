const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("", (req, res) => {
  res.json("hi, welcome to the home page");
});
app.get("/chatres", (req, res) => {
  const userMessage = UserMessage;
  
  res.json({
    response: 'The message you sent was: "${userMessage}". Bot is here to help!',
  });
});
let UserMessage = "";
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
 
  UserMessage = userMessage;
  res.json({
    response: 'Bot received your message: "${UserMessage}"',
  });
});

app.listen(PORT, () => {
  console.log('Chatbot app listening at http://localhost:${PORT}');
});